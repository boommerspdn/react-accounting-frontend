import { useState, useEffect } from "react";
import { Link, useMatchRoute } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

import SideBar from "./side-bar";
import { Menu } from "lucide-react";
import ServiceNav from "./service-nav";
import { NavbarType, ServiceLinkType } from "@/types";

interface NavBarProps {
  navItems: NavbarType;
  services: ServiceLinkType[];
}

const NavBar = ({ navItems, services }: NavBarProps) => {
  const [color, setColor] = useState("");
  const [open, setOpen] = useState(false);

  const matchRoute = useMatchRoute();
  const pathname = matchRoute({ to: "/" });
  const animation = "transition-colors ease-in-out duration-500";

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newColor = scrollY > 0 ? "bg-white text-black border-border" : "";
      setColor(newColor);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={cn(
        `fixed z-50 flex h-16 w-full items-center justify-between border-b-[1px] border-transparent px-8 ${
          pathname
            ? `bg-transparent text-white ${animation}`
            : "border-border bg-white text-black"
        }`,
        color,
      )}
    >
      <div className="flex items-center justify-center gap-2">
        <SideBar
          open={open}
          setOpen={setOpen}
          website_name={navItems?.website_name}
          home={navItems?.home}
          service={navItems?.service}
          contact_us={navItems?.contact_us}
          about_us={navItems?.about_us}
          services={services}
        />
        <Menu
          onClick={() => setOpen(true)}
          className="cursor-pointer lg:hidden"
        />
        <Link to="/" className="flex items-center gap-2">
          <img
            src={`${navItems.logo.url}`}
            alt={`${navItems.logo.alternativeText}` || "logo"}
            className="h-8 object-contain"
          />
          <span className="font-bold">{navItems?.website_name}</span>
        </Link>
      </div>
      <div className="hidden items-center gap-8 lg:flex">
        <Link
          className="hover:opacity-85"
          to="/"
          activeProps={{ style: { opacity: 0.85 } }}
        >
          {navItems?.home}
        </Link>
        <ServiceNav services={services} />
        <Link
          className="hover:opacity-85"
          to="/contact-us"
          activeProps={{ style: { opacity: 0.85 } }}
        >
          {navItems?.contact_us}
        </Link>
        <Link
          className="hover:opacity-85"
          to={"/about-us"}
          activeProps={{ style: { opacity: 0.85 } }}
        >
          {navItems?.about_us}
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
