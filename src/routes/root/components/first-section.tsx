import { ImageType, ServiceCard } from "@/types";
import Service from "./service";
import AdvertiseCarousel from "./advertise-carousel";

interface FirstSection {
  title: string;
  description: string;
  services: ServiceCard[] | undefined;
  promotions: ImageType[];
}

const FirstSection = ({
  title,
  description,
  services,
  promotions,
}: FirstSection) => {
  return (
    <section className="container my-16 space-y-8">
      <AdvertiseCarousel className="md:mb-12" promotions={promotions} />
      <h1 className="text-3xl md:text-5xl">{title}</h1>
      <p className="text-xl">{description}</p>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services?.map((service) => (
          <Service
            key={service.id}
            title={service.name}
            body={service.description}
            path={service.slug}
          />
        ))}
      </div>
    </section>
  );
};

export default FirstSection;
