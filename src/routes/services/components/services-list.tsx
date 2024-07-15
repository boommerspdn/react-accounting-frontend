import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { ServiceLinkType } from "@/types";

interface ServiceListProps {
  slug: string;
  services: ServiceLinkType[];
}

const ServicesList = ({ slug, services }: ServiceListProps) => {
  return (
    <div className="flex flex-col gap-2">
      {services.map((service, index) => (
        <Link
          key={index}
          to={`/services/$slug`}
          params={{ slug: service.slug }}
          className={cn(
            "break-words text-muted-foreground hover:text-black/80",
            service.slug === slug ? "text-black" : "",
          )}
        >
          {service.name}
        </Link>
      ))}
    </div>
  );
};

export default ServicesList;
