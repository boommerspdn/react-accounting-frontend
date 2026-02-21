import {
  fetchLayout as fetchLayoutApi,
  fetchHomePage as fetchHomePageApi,
  fetchServicesPage as fetchServicesPageApi,
  fetchContactPage as fetchContactPageApi,
  fetchAboutPage as fetchAboutPageApi,
} from "./data-api";

const baseURL = import.meta.env.VITE_API_URL as string;

export const fetchLayout = () => fetchLayoutApi(baseURL);
export const fetchHomePage = () => fetchHomePageApi(baseURL);
export const fetchServicesPage = (slug: string) =>
  fetchServicesPageApi(baseURL, slug);
export const fetchContactPage = () => fetchContactPageApi(baseURL);
export const fetchAboutPage = () => fetchAboutPageApi(baseURL);
