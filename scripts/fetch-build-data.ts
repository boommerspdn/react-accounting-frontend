/**
 * Fetches all route data at build time, downloads images, and writes:
 * - public/preloaded-data.js (window.__PRELOADED_DATA__ with local image paths)
 * - public/build-images/* (downloaded images)
 * - scripts/prerender-routes.json (route list)
 *
 * Run before `vite build`. Requires VITE_API_URL to be set (e.g. in .env).
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname, extname } from "path";
import { fileURLToPath } from "url";
import { createHash } from "crypto";
import {
  fetchLayout,
  fetchHomePage,
  fetchAboutPage,
  fetchContactPage,
  fetchServicesPage,
} from "../src/lib/data-api";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const BUILD_IMAGES_DIR = "build-images";

function loadEnv() {
  const envPath = join(root, ".env");
  if (!existsSync(envPath)) return;
  const content = readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const m = line.match(/^\s*([^#=]+)=(.*)$/);
    if (m) {
      const key = m[1].trim();
      const value = m[2].trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = value;
    }
  }
}

/** Recursively collect every image URL from properties named `url`. */
function collectImageUrls(obj: unknown, baseURL: string, out: Set<string>): void {
  if (obj == null) return;
  const base = baseURL.replace(/\/$/, "");
  if (typeof obj === "string") return;
  if (Array.isArray(obj)) {
    obj.forEach((item) => collectImageUrls(item, baseURL, out));
    return;
  }
  if (typeof obj === "object") {
    for (const key of Object.keys(obj)) {
      const val = (obj as Record<string, unknown>)[key];
      if (key === "url" && typeof val === "string" && val.trim()) {
        const s = val.trim();
        if (s.startsWith("http")) out.add(s);
        else if (s.startsWith("/")) out.add(`${base}${s}`);
      } else {
        collectImageUrls(val, baseURL, out);
      }
    }
  }
}

/** Download one image and save to public/build-images/<hash><ext>. Returns local path e.g. /build-images/abc.jpg */
async function downloadImage(
  url: string,
  imagesDir: string,
  urlToPath: Map<string, string>
): Promise<string> {
  const existing = urlToPath.get(url);
  if (existing) return existing;

  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) {
    console.warn("Could not download image:", url, res.statusText);
    return url;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const ext = extname(new URL(url).pathname) || ".jpg";
  const safeExt = /^\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(ext) ? ext : ".jpg";
  const hash = createHash("sha256").update(url).digest("hex").slice(0, 12);
  const filename = `${hash}${safeExt}`;
  const filepath = join(imagesDir, filename);
  writeFileSync(filepath, buf);
  const localPath = `/${BUILD_IMAGES_DIR}/${filename}`;
  urlToPath.set(url, localPath);
  return localPath;
}

/** Replace all collected image URLs in the object with local paths. */
function replaceUrlsInObject(obj: unknown, urlToPath: Map<string, string>): unknown {
  if (obj == null) return obj;
  if (typeof obj === "string") {
    return urlToPath.get(obj.trim()) ?? obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => replaceUrlsInObject(item, urlToPath));
  }
  if (typeof obj === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(obj)) {
      out[key] = replaceUrlsInObject(val, urlToPath);
    }
    return out;
  }
  return obj;
}

loadEnv();

const baseURL = process.env.VITE_API_URL;
if (!baseURL) {
  console.error("VITE_API_URL is not set. Add it to .env or the environment.");
  process.exit(1);
}

async function main() {
  console.log("Fetching build-time data from", baseURL, "...");

  const [layout, home, about, contact] = await Promise.all([
    fetchLayout(baseURL),
    fetchHomePage(baseURL),
    fetchAboutPage(baseURL),
    fetchContactPage(baseURL),
  ]);

  const services = layout.services as Array<{ slug: string }> | undefined;
  const slugs = Array.isArray(services)
    ? services.map((s) => s.slug).filter(Boolean)
    : [];
  const servicePages: Record<string, Awaited<ReturnType<typeof fetchServicesPage>>> = {};
  for (const slug of slugs) {
    servicePages[slug] = await fetchServicesPage(baseURL, slug);
  }

  const preloaded = {
    layout,
    home,
    about,
    contact,
    services: servicePages,
  };

  // Collect all image URLs from the preloaded data
  const imageUrls = new Set<string>();
  collectImageUrls(preloaded, baseURL, imageUrls);

  const publicDir = join(root, "public");
  if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });
  const imagesDir = join(publicDir, BUILD_IMAGES_DIR);
  if (!existsSync(imagesDir)) mkdirSync(imagesDir, { recursive: true });

  const urlToPath = new Map<string, string>();
  if (imageUrls.size > 0) {
    console.log("Downloading", imageUrls.size, "images...");
    for (const url of imageUrls) {
      await downloadImage(url, imagesDir, urlToPath);
    }
    // Also map relative paths (e.g. /uploads/foo.jpg) to local path so we replace them in data
    for (const [fullUrl, localPath] of urlToPath) {
      try {
        const rel = new URL(fullUrl).pathname;
        if (rel && rel !== "/") urlToPath.set(rel, localPath);
      } catch {
        /* ignore */
      }
    }
    console.log("Wrote", urlToPath.size, "files to public/" + BUILD_IMAGES_DIR + "/");
  }

  const preloadedWithLocalImages = replaceUrlsInObject(
    JSON.parse(JSON.stringify(preloaded)),
    urlToPath
  ) as typeof preloaded;

  const preloadedJs = `window.__PRELOADED_DATA__ = ${JSON.stringify(preloadedWithLocalImages)};`;
  writeFileSync(join(publicDir, "preloaded-data.js"), preloadedJs, "utf-8");
  console.log("Wrote public/preloaded-data.js");

  const routes = [
    "/",
    "/about-us",
    "/contact-us",
    ...slugs.map((slug) => `/services/${slug}`),
  ];
  writeFileSync(
    join(__dirname, "prerender-routes.json"),
    JSON.stringify(routes, null, 2),
    "utf-8"
  );
  console.log("Wrote scripts/prerender-routes.json with", routes.length, "routes");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
