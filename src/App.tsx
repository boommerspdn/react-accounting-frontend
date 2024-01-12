import "./App.css";
import { Outlet, useLoaderData } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import NavBar from "./components/nav-bar";
import { LayoutContentType } from "./types";
import Footer from "./components/footer";

function App() {
  const { navbar, services }: LayoutContentType = useLoaderData({
    from: "__root__",
  });

  return (
    <>
      <NavBar navItems={navbar} services={services} />
      <Outlet />
      <Footer />
      <TanStackRouterDevtools />
    </>
  );
}

export default App;
