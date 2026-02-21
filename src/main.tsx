import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import App from "./App";

import HomePage from "./routes/root/page";
import AboutPage from "./routes/about-us/page";
import ErrorPage from "./components/error-page";
import NotFoundPage from "./components/not-found-page";

import {
  fetchAboutPage,
  fetchContactPage,
  fetchHomePage,
  fetchLayout,
  fetchServicesPage,
} from "./lib/data";
import { preloaded } from "./lib/preloaded";
import ServicesPage from "./routes/services/page";
import ContactPage from "./routes/contact-us/page";
import { LayoutContentType } from "./types";
import { getImageSrc } from "./lib/utils";

const rootRoute = createRootRoute({
  component: () => <App />,
  loader: async () => preloaded.getLayout() ?? fetchLayout(),
  staleTime: Infinity,
  notFoundComponent: () => <NotFoundPage />,
  head: ({ loaderData }) => {
    const layout = loaderData as LayoutContentType | undefined;
    if (!layout?.navbar?.logo?.url) return {};
    return {
      links: [
        { rel: "icon", type: "image/svg+xml", href: getImageSrc(layout.navbar.logo.url) },
      ],
    };
  },
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <HomePage />,
  loader: async () => preloaded.getHome() ?? fetchHomePage(),
  staleTime: Infinity,
  errorComponent: () => <ErrorPage />,
  head: ({ loaderData }) => {
    const data = loaderData as
      | {
          home: { SEO: { title: string; description: string } };
          services: unknown;
        }
      | undefined;
    if (!data?.home?.SEO) return {};
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Fast on Time Accounting",
      url: "https://fastontime.co.th/",
    };
    return {
      meta: [
        { charSet: "utf-8" },
        { title: data.home.SEO.title },
        { name: "description", content: data.home.SEO.description },
      ],
      links: [{ rel: "canonical", href: "https://fastontime.co.th" }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(schemaData),
        },
      ],
    };
  },
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/$slug",
  component: () => <ServicesPage />,
  loader: async ({ params }) =>
    preloaded.getServicesPage(params.slug) ?? fetchServicesPage(params.slug),
  staleTime: Infinity,
  errorComponent: () => <ErrorPage />,
  head: ({ loaderData, params }) => {
    const data = loaderData as
      | { service: Array<{ SEO: { title: string; description: string } }> }
      | undefined;
    const slug = params?.slug;
    if (!data?.service?.[0]?.SEO || slug == null) return {};
    return {
      meta: [
        { charSet: "utf-8" },
        { title: data.service[0].SEO.title },
        { name: "description", content: data.service[0].SEO.description },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://fastontime.co.th/services/${slug}`,
        },
      ],
    };
  },
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about-us",
  component: () => <AboutPage />,
  loader: async () => preloaded.getAbout() ?? fetchAboutPage(),
  staleTime: Infinity,
  errorComponent: () => <ErrorPage />,
  head: ({ loaderData }) => {
    const data = loaderData as
      | { SEO: { title: string; description: string }; header?: unknown }
      | undefined;
    if (!data?.SEO) return {};
    return {
      meta: [
        { charSet: "utf-8" },
        { title: data.SEO.title },
        { name: "description", content: data.SEO.description },
      ],
      links: [{ rel: "canonical", href: "https://fastontime.co.th/about-us" }],
    };
  },
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact-us",
  component: () => <ContactPage />,
  loader: async () => preloaded.getContact() ?? fetchContactPage(),
  staleTime: Infinity,
  errorComponent: () => <ErrorPage />,
  head: ({ loaderData }) => {
    const data = loaderData as
      | {
          contact: { SEO: { title: string; description: string } };
          socials?: unknown;
        }
      | undefined;
    if (!data?.contact?.SEO) return {};
    return {
      meta: [
        { charSet: "utf-8" },
        { title: data.contact.SEO.title },
        { name: "description", content: data.contact.SEO.description },
      ],
      links: [
        { rel: "canonical", href: "https://fastontime.co.th/contact-us" },
      ],
    };
  },
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  contactRoute,
  servicesRoute,
]);

const router = createRouter({
  routeTree,
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
