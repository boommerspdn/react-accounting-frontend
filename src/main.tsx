import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  Router,
  Route,
  RootRoute,
  NotFoundRoute,
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
import ServicesPage from "./routes/services/page";
import ContactPage from "./routes/contact-us/page";

const rootRoute = new RootRoute({
  component: () => <App />,
  loader: () => fetchLayout(),
  staleTime: 10_000,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <HomePage />,
  loader: () => fetchHomePage(),
  staleTime: 10_000,
  errorComponent: () => <ErrorPage />,
});

const servicesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/services/$slug",
  component: () => <ServicesPage />,
  loader: ({ params }) => fetchServicesPage(params.slug),
  errorComponent: () => <ErrorPage />,
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/about-us",
  component: () => <AboutPage />,
  loader: () => fetchAboutPage(),
  errorComponent: () => <ErrorPage />,
});

const contactRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/contact-us",
  component: () => <ContactPage />,
  loader: () => fetchContactPage(),
  errorComponent: () => <ErrorPage />,
});

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => <NotFoundPage />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  contactRoute,
  servicesRoute,
]);

const router = new Router({ routeTree, notFoundRoute });

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
