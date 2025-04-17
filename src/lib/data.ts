import { flattenAttributes } from "./utils";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const baseURL = import.meta.env.VITE_API_URL;

export const fetchLayout = async () => {
  const [navbar, services, footer, socials] = await Promise.all([
    fetcher(`${baseURL}/api/bprservice-navigation-bar?populate=*`),
    fetcher(`${baseURL}/api/bprservice-services?fields[0]=name&fields[1]=slug`),
    fetcher(`${baseURL}/api/bprservice-footer?populate=*`),
    fetcher(`${baseURL}/api/bprservice-social-networks?populate=*`),
  ]);

  const flattenedNavbar = flattenAttributes(navbar.data);
  const flattenedServices = flattenAttributes(services.data);
  const flattenedFooter = flattenAttributes(footer.data);
  const flattenedSocials = flattenAttributes(socials.data);

  return {
    navbar: flattenedNavbar,
    services: flattenedServices,
    footer: flattenedFooter,
    socials: flattenedSocials,
  };
};

export const fetchHomePage = async () => {
  const [home, services] = await Promise.all([
    fetcher(`${baseURL}/api/bprservice-home-page?populate=*`),
    fetcher(
      `${baseURL}/api/bprservice-services?populate=*&fields[0]=name&fields[1]=description&fields[2]=slug`,
    ),
  ]);

  const flattenedHome = flattenAttributes(home.data);
  const flattenedServices = flattenAttributes(services.data);

  return { home: flattenedHome, services: flattenedServices };
};

export const fetchServicesPage = async (slug: string) => {
  const [service, servicesLink] = await Promise.all([
    fetcher(
      `${baseURL}/api/bprservice-services?filters[slug][$eq]=${slug}&populate=*`,
    ),
    fetcher(
      `${baseURL}/api/bprservice-services?fields[0]=id&fields[1]=name&fields[3]=slug`,
    ),
  ]);

  const flattenedService = flattenAttributes(service.data);
  const flattenedServicesLink = flattenAttributes(servicesLink.data);

  return { service: flattenedService, servicesLink: flattenedServicesLink };
};

export const fetchContactPage = async () => {
  const [contact, socials] = await Promise.all([
    fetcher(`${baseURL}/api/bprservice-contact-page?populate=*`),
    fetcher(`${baseURL}/api/bprservice-social-networks?populate=*`),
  ]);

  const flattenedContact = flattenAttributes(contact.data);
  const flattenedSocials = flattenAttributes(socials.data);

  return { contact: flattenedContact, socials: flattenedSocials };
};

export const fetchAboutPage = async () => {
  const about = await fetcher(
    `${baseURL}/api/bprservice-about-page?populate=*`,
  );

  return flattenAttributes(about.data);
};
