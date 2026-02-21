import "./App.css";
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
      <HeadContent />
      <NavBar navItems={navbar} services={services} />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
