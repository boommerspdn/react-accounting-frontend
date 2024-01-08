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
import AboutPage from "./routes/about-page/page";
import ErrorPage from "./components/error-page";
import NotFoundPage from "./components/not-found-page";
import { fetchContent } from "./lib/data";
import { PostType } from "./types";

const rootRoute = new RootRoute({
  component: () => <App />,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <HomePage />,
  pendingComponent: () => <>loading...</>,
  errorComponent: () => <ErrorPage />
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/about-us",
  component: () => <AboutPage />,
  loader: () => fetchContent("/posts", null),
  pendingComponent: () => <>loading...</>,
  errorComponent: () => <ErrorPage />
});

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => <NotFoundPage />,
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

const router = new Router({ routeTree, notFoundRoute });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
