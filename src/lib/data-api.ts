import qs from "qs";
import { flattenAttributes } from "./utils";

const STALE_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds

const cache = new Map<string, { data: unknown; timestamp: number }>();

const buildQuery = (obj: object) =>
  qs.stringify(obj, { encodeValuesOnly: true });

function createFetcher(baseURL: string) {
  const base = baseURL.replace(/\/$/, "");
  return async (pathOrUrl: string) => {
    const fullUrl = pathOrUrl.startsWith("http")
      ? pathOrUrl
      : `${base}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
    const now = Date.now();
    const cached = cache.get(fullUrl);

    if (cached && now - cached.timestamp < STALE_TIME) {
      return cached.data as Promise<unknown>;
    }

    const res = await fetch(fullUrl);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);

    const data = await res.json();
    cache.set(fullUrl, { data, timestamp: now });
    return data;
  };
}

/** Fetch functions that accept baseURL for use in app (with import.meta.env) or in Node build script (with process.env). */
export async function fetchLayout(baseURL: string) {
  const fetcher = createFetcher(baseURL);
  const navQuery = buildQuery({ populate: { logo: { fields: ["url"] } } });
  const serviceQuery = buildQuery({ fields: ["name", "slug"] });
  const socialQuery = buildQuery({ populate: { image: { fields: ["url"] } } });

  const [navbar, services, footer, socials] = await Promise.all([
    fetcher(`/api/accounting-navigation-bar?${navQuery}`),
    fetcher(`/api/accounting-services?${serviceQuery}`),
    fetcher(`/api/accounting-footer`),
    fetcher(`/api/accounting-social-networks?${socialQuery}`),
  ]);

  const data = { navbar, services, footer, socials } as {
    navbar: { data: unknown };
    services: { data: unknown };
    footer: { data: unknown };
    socials: { data: unknown };
  };
  return {
    navbar: flattenAttributes(data.navbar.data),
    services: flattenAttributes(data.services.data),
    footer: flattenAttributes(data.footer.data),
    socials: flattenAttributes(data.socials.data),
  };
}

export async function fetchHomePage(baseURL: string) {
  const fetcher = createFetcher(baseURL);
  const homeQuery = buildQuery({
    populate: {
      banner_image: { fields: ["url", "alternativeText"] },
      section_2_image: { fields: ["url", "alternativeText"] },
      promotion_ads: { fields: ["url", "alternativeText"] },
      SEO: { populate: "*" },
    },
  });
  const servicesQuery = buildQuery({
    fields: ["name", "description", "slug"],
  });

  const [home, services] = await Promise.all([
    fetcher(`/api/accounting-home-page?${homeQuery}`),
    fetcher(`/api/accounting-services?${servicesQuery}`),
  ]);

  const raw = { home, services } as { home: { data: unknown }; services: { data: unknown } };
  return {
    home: flattenAttributes(raw.home.data),
    services: flattenAttributes(raw.services.data),
  };
}

export async function fetchServicesPage(baseURL: string, slug: string) {
  const fetcher = createFetcher(baseURL);
  const serviceQuery = buildQuery({
    filters: { slug: { $eq: slug } },
    populate: {
      SEO: true,
      package_type: {
        on: {
          "content.contact": true,
          "content.package-list": { populate: "*" },
        },
      },
    },
  });
  const linksQuery = buildQuery({ fields: ["name", "slug"] });

  const [serviceRes, servicesLinkRes] = await Promise.all([
    fetcher(`/api/accounting-services?${serviceQuery}`),
    fetcher(`/api/accounting-services?${linksQuery}`),
  ]);

  const raw = {
    serviceRes: serviceRes as { data: unknown },
    servicesLinkRes: servicesLinkRes as { data: unknown },
  };
  return {
    service: flattenAttributes(raw.serviceRes.data || []),
    servicesLink: flattenAttributes(raw.servicesLinkRes.data || []),
  };
}

export async function fetchContactPage(baseURL: string) {
  const fetcher = createFetcher(baseURL);
  const contactQuery = buildQuery({ populate: ["SEO"] });
  const socialQuery = buildQuery({ populate: { image: { fields: ["url"] } } });

  const [contact, socials] = await Promise.all([
    fetcher(`/api/accounting-contact-page?${contactQuery}`),
    fetcher(`/api/accounting-social-networks?${socialQuery}`),
  ]);

  const raw = { contact, socials } as {
    contact: { data: unknown };
    socials: { data: unknown };
  };
  return {
    contact: flattenAttributes(raw.contact.data),
    socials: flattenAttributes(raw.socials.data),
  };
}

export async function fetchAboutPage(baseURL: string) {
  const fetcher = createFetcher(baseURL);
  const query = buildQuery({
    populate: {
      header_image: { fields: ["url"] },
      reason_image: { fields: ["url"] },
      SEO: { populate: "*" },
    },
  });

  const about = (await fetcher(`/api/accounting-about-page?${query}`)) as {
    data: unknown;
  };
  return flattenAttributes(about.data);
}
