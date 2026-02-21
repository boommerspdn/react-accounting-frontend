/**
 * Post-build script: serves dist/ and uses Puppeteer to render each route to static HTML.
 * Writes dist/index.html (/) and dist/<path>/index.html for other routes (including /services/<slug>).
 *
 * Run after `vite build`. Reads routes from scripts/prerender-routes.json.
 */
import { createServer } from "http";
import { readFileSync, existsSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname, extname, normalize } from "path";
import { fileURLToPath } from "url";
import { createReadStream } from "fs";
import { statSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const distDir = join(root, "dist");

const MIMES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

function serveStatic(
  req: import("http").IncomingMessage,
  res: import("http").ServerResponse,
  port: number
): void {
  const pathname = (req.url ?? "/").replace(/\?.*$/, "") || "/";
  const decoded = decodeURIComponent(pathname);
  const safe = normalize(decoded).replace(/^(\.\.(\/|\\|$))+/, "");
  const filePath = join(distDir, safe === "/" ? "index.html" : safe);

  if (!filePath.startsWith(distDir)) {
    res.writeHead(403).end();
    return;
  }

  if (existsSync(filePath) && statSync(filePath).isFile()) {
    const ext = extname(filePath);
    const type = MIMES[ext] ?? "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    createReadStream(filePath).pipe(res);
    return;
  }

  const indexHtml = join(distDir, "index.html");
  if (!existsSync(indexHtml)) {
    res.writeHead(404).end("index.html not found. Run vite build first.");
    return;
  }
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(readFileSync(indexHtml, "utf-8"));
}

function startServer(port: number): Promise<void> {
  return new Promise((resolve) => {
    const server = createServer((req, res) => serveStatic(req, res, port));
    server.listen(port, () => {
      console.log("Prerender server at http://localhost:" + port);
      resolve();
    });
  });
}

async function main() {
  if (!existsSync(distDir)) {
    console.error("dist/ not found. Run vite build first.");
    process.exit(1);
  }

  const routesPath = join(__dirname, "prerender-routes.json");
  if (!existsSync(routesPath)) {
    console.error("scripts/prerender-routes.json not found. Run npm run build:data first.");
    process.exit(1);
  }

  const routes: string[] = JSON.parse(readFileSync(routesPath, "utf-8"));
  const port = 34567;

  await startServer(port);
  const baseUrl = `http://localhost:${port}`;

  const puppeteer = await import("puppeteer");
  const browser = await puppeteer.default.launch({ headless: true });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });

    for (const route of routes) {
      const path = route === "/" ? "/" : route.endsWith("/") ? route.slice(0, -1) : route;
      const url = `${baseUrl}${path}`;
      console.log("Prerendering", url);
      await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
      await new Promise((r) => setTimeout(r, 600));
      const html = await page.content();

      const outPath = path === "/" ? join(distDir, "index.html") : join(distDir, path, "index.html");
      const outDir = dirname(outPath);
      if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
      writeFileSync(outPath, html, "utf-8");
    }

    console.log("Prerendered", routes.length, "routes to dist/");
  } finally {
    await browser.close();
    process.exit(0);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
