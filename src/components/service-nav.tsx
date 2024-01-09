import { ServiceLinkType } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface ServiceNavProps {
  services: ServiceLinkType;
}

const ServiceNav = ({ services }: ServiceNavProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="w-fit li-m-0">
        <NavigationMenuItem>
          <Link to={`/services/$slug`} params={{slug: services.data[0].attributes.slug}}>
            <NavigationMenuTrigger className="p-0 m-0 h-auto bg-inherit text-base font-normal hover:bg-inherit hover:text-inherit focus:text-inherit focus:bg-inherit data-[active]:bg-inherit data-[state=open]:bg-inherit transition-none">
              บริการของเรา
            </NavigationMenuTrigger>
          </Link>
          <NavigationMenuContent>
            <ul className="w-[240px] p-2 space-y-1">
              {services.data.map((service) => (
                <li key={service.attributes.name} className="m-0">
                  <NavigationMenuLink asChild>
                    <Link
                      to={`/services/$slug`}
                      params={{ slug: service.attributes.slug }}
                      className="h-full w-full flex p-1 rounded-md hover:bg-accent"
                    >
                      <p className="text-sm px-1">{service.attributes.name}</p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default ServiceNav;
