import "./App.css";
import {
  Outlet,
  useLoaderData,
  ScrollRestoration,
} from "@tanstack/react-router";
import NavBar from "./components/nav-bar";
import { LayoutContentType } from "./types";
import Footer from "./components/footer";
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  const { navbar, services }: LayoutContentType = useLoaderData({
    from: "__root__",
  });

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <link
            rel="icon"
            type="image/svg+xml"
            href={`${import.meta.env.VITE_API_URL}${navbar.logo.url}`}
          />
        </Helmet>
        <NavBar navItems={navbar} services={services} />
        <Outlet />
        <Footer />
        <ScrollRestoration />
      </HelmetProvider>
    </>
  );
}

export default App;
