import "./App.css";
import { createPortal } from "react-dom";
import { Outlet, useLoaderData, HeadContent } from "@tanstack/react-router";
import NavBar from "./components/nav-bar";
import { LayoutContentType } from "./types";
import Footer from "./components/footer";

function App() {
  const { navbar, services }: LayoutContentType = useLoaderData({
    from: "__root__",
  });

  return (
    <>
      {typeof document !== "undefined" &&
        createPortal(<HeadContent />, document.head)}
      <NavBar navItems={navbar} services={services} />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
