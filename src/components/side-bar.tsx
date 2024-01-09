import { Link } from "@tanstack/react-router";

import { ServiceLinkType } from "@/types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface SideBarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  website_name: string;
  home: string;
  service: string;
  about_us: string;
  contact_us: string;
  services: ServiceLinkType;
}

const SideBar = ({
  open,
  setOpen,
  website_name,
  home,
  service,
  about_us,
  contact_us,
  services,
}: SideBarProps) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle className="text-left">{website_name}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2 pt-4">
          <Link href={"/"} className="w-fit" onClick={() => setOpen(false)}>
            {home}
          </Link>
          <div className="flex flex-col space-y-1">
            <Link
              href={`/services/${services.data[0].attributes.slug}`}
              className="w-fit"
              onClick={() => setOpen(false)}
            >
              {service}
            </Link>
            <ul className="flex flex-col gap-1 border-l-[1px] border-border ms-4">
              {services.data.map((service) => (
                <Link
                  key={service.attributes.name}
                  href={`/services/${service.attributes.slug}`}
                  className="w-fit ps-2"
                  onClick={() => setOpen(false)}
                >
                  <li className="m-0">{service.attributes.name}</li>
                </Link>
              ))}
            </ul>
          </div>
          <Link
            href={"/contact-us"}
            className="w-fit"
            onClick={() => setOpen(false)}
          >
            {contact_us}
          </Link>
          <Link
            href={"/about-us"}
            className="w-fit"
            onClick={() => setOpen(false)}
          >
            {about_us}
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideBar;
