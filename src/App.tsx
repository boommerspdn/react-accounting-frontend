import "./App.css";
import { Outlet, useLoaderData } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
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
          <title data-rh="true">Dynamic title</title>
        </Helmet>
        <NavBar navItems={navbar} services={services} />
        <Outlet />
        <Footer />
        <TanStackRouterDevtools />
      </HelmetProvider>
    </>
  );
}

export default App;
