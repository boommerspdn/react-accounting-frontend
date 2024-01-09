import { useState, useEffect } from "react";
// import { usePathname } from "next/navigation";
import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

import SideBar from "./side-bar";
import { Menu } from "lucide-react";
import ServiceNav from "./service-nav";
import { NavbarType, ServiceLinkType } from "@/types";
import { Router } from "@tanstack/react-router";

interface NavBarProps {
  navItems: NavbarType;
  services: ServiceLinkType;
}

const NavBar = ({ navItems, services }: NavBarProps) => {
  const [color, setColor] = useState("");
  const [open, setOpen] = useState(false);

  const pathname = window.location.pathname;
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
        `h-16 fixed flex items-center justify-between w-full px-8 border-transparent border-b-[1px] z-50 ${
          pathname === "/"
            ? `bg-transparent text-white ${animation}`
            : "bg-white text-black border-border"
        }`,
        color
      )}
    >
      <div className="flex gap-2 items-center justify-center">
        <SideBar
          open={open}
          setOpen={setOpen}
          website_name={navItems?.data.attributes.website_name}
          home={navItems?.data.attributes.home}
          service={navItems?.data.attributes.service}
          contact_us={navItems?.data.attributes.contact_us}
          about_us={navItems?.data.attributes.about_us}
          services={services}
        />
        <Menu
          onClick={() => setOpen(true)}
          className="md:hidden cursor-pointer"
        />
        <span className="font-bold">{navItems?.data.attributes.website_name}</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <Link to="/">{navItems?.data.attributes.home}</Link>
        <ServiceNav services={services} />
        <Link to="/contact-us">{navItems?.data.attributes.contact_us}</Link>
        <Link to={"/about-us"}>{navItems?.data.attributes.about_us}</Link>
      </div>
    </nav>
  );
};

export default NavBar;
