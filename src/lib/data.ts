import { flattenAttributes } from "./utils";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const baseURL = import.meta.env.VITE_API_URL;

export const fetchLayout = async () => {
  const [navbar, services, footer, socials] = await Promise.all([
    fetcher(`${baseURL}/api/accounting-navigation-bar?populate=*`),
    fetcher(`${baseURL}/api/accounting-services?fields[0]=name&fields[1]=slug`),
    fetcher(`${baseURL}/api/accounting-footer?populate=*`),
    fetcher(`${baseURL}/api/accounting-social-networks?populate=*`),
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
    fetcher(`${baseURL}/api/accounting-home-page?populate=*`),
    fetcher(
      `${baseURL}/api/accounting-services?populate=*&fields[0]=name&fields[1]=description&fields[2]=slug`,
    ),
  ]);

  const flattenedHome = flattenAttributes(home.data);
  const flattenedServices = flattenAttributes(services.data);

  return { home: flattenedHome, services: flattenedServices };
};

export const fetchServicesPage = async () => {
  const services = await fetcher(
    `${baseURL}/api/accounting-services?populate=*`,
  );

  return flattenAttributes(services.data);
};

export const fetchContactPage = async () => {
  const [contact, socials] = await Promise.all([
    fetcher(`${baseURL}/api/accounting-contact-page?populate=*`),
    fetcher(`${baseURL}/api/accounting-social-networks?populate=*`),
  ]);

  const flattenedContact = flattenAttributes(contact.data);
  const flattenedSocials = flattenAttributes(socials.data);

  return { contact: flattenedContact, socials: flattenedSocials };
};

export const fetchAboutPage = async () => {
  const about = await fetcher(
    `${baseURL}/api/accounting-about-page?populate=*`,
  );

  return flattenAttributes(about.data);
};
