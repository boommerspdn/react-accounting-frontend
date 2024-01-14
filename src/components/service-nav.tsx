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
  services: ServiceLinkType[];
}

const ServiceNav = ({ services }: ServiceNavProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="li-m-0 w-fit">
        <NavigationMenuItem>
          <Link
            to={`/services/$slug`}
            params={{ slug: services[0].slug }}
            activeProps={{ style: { opacity: 0.85 } }}
          >
            <NavigationMenuTrigger className="m-0 h-auto bg-inherit p-0 text-base font-normal transition-none hover:bg-inherit hover:text-inherit hover:opacity-85 focus:bg-inherit focus:text-inherit data-[active]:bg-inherit data-[state=open]:bg-inherit">
              บริการของเรา
            </NavigationMenuTrigger>
          </Link>
          <NavigationMenuContent>
            <ul className="w-[240px] space-y-1 p-2">
              {services.map((service) => (
                <li key={service.name} className="m-0">
                  <NavigationMenuLink asChild>
                    <Link
                      to={`/services/$slug`}
                      params={{ slug: service.slug }}
                      className="flex h-full w-full rounded-md p-1 hover:bg-accent"
                    >
                      <p className="px-1 text-sm">{service.name}</p>
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
