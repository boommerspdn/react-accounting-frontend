import qs from "qs";
import { flattenAttributes } from "./utils";

const baseURL = import.meta.env.VITE_API_URL;

// Helper to build clean query strings
const buildQuery = (obj: object) =>
  qs.stringify(obj, { encodeValuesOnly: true });

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
    return res.json();
  });

export const fetchLayout = async () => {
  const navQuery = buildQuery({ populate: { logo: { fields: ["url"] } } });
  const serviceQuery = buildQuery({ fields: ["name", "slug"] });
  const socialQuery = buildQuery({ populate: { image: { fields: ["url"] } } });

  const [navbar, services, footer, socials] = await Promise.all([
    fetcher(`${baseURL}/api/accounting-navigation-bar?${navQuery}`),
    fetcher(`${baseURL}/api/accounting-services?${serviceQuery}`),
    fetcher(`${baseURL}/api/accounting-footer`), // No populate needed
    fetcher(`${baseURL}/api/accounting-social-networks?${socialQuery}`),
  ]);

  return {
    navbar: flattenAttributes(navbar.data),
    services: flattenAttributes(services.data),
    footer: flattenAttributes(footer.data),
    socials: flattenAttributes(socials.data),
  };
};

export const fetchHomePage = async () => {
  const homeQuery = buildQuery({
    populate: {
      banner_image: { fields: ["url", "alternativeText"] },
      section_2_image: { fields: ["url", "alternativeText"] },
      promotion_ads: { fields: ["url", "alternativeText"] },
      SEO: { populate: "*" },
    },
  });

  // performance fix: removed populate=* from services list
  const servicesQuery = buildQuery({
    fields: ["name", "description", "slug"],
  });

  const [home, services] = await Promise.all([
    fetcher(`${baseURL}/api/accounting-home-page?${homeQuery}`),
    fetcher(`${baseURL}/api/accounting-services?${servicesQuery}`),
  ]);

  return {
    home: flattenAttributes(home.data),
    services: flattenAttributes(services.data),
  };
};

export const fetchServicesPage = async (slug: string) => {
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

  const [service, servicesLink] = await Promise.all([
    fetcher(`${baseURL}/api/accounting-services?${serviceQuery}`),
    fetcher(`${baseURL}/api/accounting-services?${linksQuery}`),
  ]);

  return {
    service: flattenAttributes(service.data),
    servicesLink: flattenAttributes(servicesLink.data),
  };
};

export const fetchContactPage = async () => {
  const contactQuery = buildQuery({ populate: ["SEO"] });
  const socialQuery = buildQuery({ populate: { image: { fields: ["url"] } } });

  const [contact, socials] = await Promise.all([
    fetcher(`${baseURL}/api/accounting-contact-page?${contactQuery}`),
    fetcher(`${baseURL}/api/accounting-social-networks?${socialQuery}`),
  ]);

  return {
    contact: flattenAttributes(contact.data),
    socials: flattenAttributes(socials.data),
  };
};

export const fetchAboutPage = async () => {
  const query = buildQuery({
    populate: {
      header_image: { fields: ["url"] },
      reason_image: { fields: ["url"] },
      SEO: { populate: "*" },
    },
  });

  const about = await fetcher(`${baseURL}/api/accounting-about-page?${query}`);
  return flattenAttributes(about.data);
};
