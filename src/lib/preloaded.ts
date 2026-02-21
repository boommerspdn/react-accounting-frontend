/**
 * Build-time preloaded data injected as window.__PRELOADED_DATA__.
 * When present, route loaders use this instead of fetching from the API.
 */

declare global {
  interface Window {
    __PRELOADED_DATA__?: PreloadedData;
  }
}

export interface PreloadedData {
  layout?: Awaited<ReturnType<typeof import("./data-api").fetchLayout>>;
  home?: Awaited<ReturnType<typeof import("./data-api").fetchHomePage>>;
  about?: Awaited<ReturnType<typeof import("./data-api").fetchAboutPage>>;
  contact?: Awaited<ReturnType<typeof import("./data-api").fetchContactPage>>;
  services?: Record<
    string,
    Awaited<ReturnType<typeof import("./data-api").fetchServicesPage>>
  >;
}

function get(): PreloadedData | undefined {
  if (typeof window === "undefined") return undefined;
  return window.__PRELOADED_DATA__;
}

export const preloaded = {
  get,
  getLayout: () => get()?.layout,
  getHome: () => get()?.home,
  getAbout: () => get()?.about,
  getContact: () => get()?.contact,
  getServicesPage: (slug: string) => get()?.services?.[slug],
};
