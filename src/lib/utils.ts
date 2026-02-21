import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Resolve image URL: use as-is if local (/build-images/) or full URL; else prepend Strapi base in dev. */
export function getImageSrc(url: string | undefined): string {
  if (!url) return "";
  // Build-time downloaded images: always use as-is (same origin)
  if (url.startsWith("/build-images/")) return url;
  // Full URL (e.g. production Strapi): use as-is
  if (url.startsWith("http")) return url;
  // Relative Strapi path in dev: prepend API base so Strapi can serve it
  const apiUrl = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");
  if (apiUrl && url.startsWith("/")) return `${apiUrl}${url}`;
  return url;
}

export function flattenAttributes(data: any): any {
  // Base case for recursion
  if (!data) return null;

  // Handling array data
  if (Array.isArray(data)) {
    return data.map(flattenAttributes);
  }

  let flattened: { [key: string]: any } = {};

  // Handling attributes
  if (data.attributes) {
    for (let key in data.attributes) {
      if (
        typeof data.attributes[key] === "object" &&
        data.attributes[key] !== null &&
        "data" in data.attributes[key]
      ) {
        flattened[key] = flattenAttributes(data.attributes[key].data);
      } else {
        flattened[key] = data.attributes[key];
      }
    }
  }

  // Copying non-attributes and non-data properties
  for (let key in data) {
    if (key !== "attributes" && key !== "data") {
      flattened[key] = data[key];
    }
  }

  // Handling nested data
  if (data.data) {
    flattened = { ...flattened, ...flattenAttributes(data.data) };
  }

  return flattened;
}
