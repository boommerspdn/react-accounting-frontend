import Header from "@/components/header";
import { ServiceLinkType, ServicePageType } from "@/types";
import { useLoaderData, useParams } from "@tanstack/react-router";
import ServicesList from "./components/services-list";
import RichText from "@/components/rich-text";
import Contact from "@/components/contact";
import PackagesList from "./components/packages-list";

const ServicesPage = () => {
  const { slug } = useParams({ strict: false });
  const services = useLoaderData({
    from: "/services/$slug",
  }) as ServicePageType[];

  const serviceData = services.filter((service) => service.slug === slug);
  const servicesLink = services.map((service) => ({
    id: service.id,
    name: service.name,
    slug: service.slug,
  }));

  console.log(services);

  return (
    <div className="py-16">
      <Header title={serviceData[0].name} />
      <div className="container relative flex flex-row gap-2">
        <div className="sticky top-[80px] hidden h-full w-[280px] text-xl md:flex md:shrink-0 md:flex-col md:gap-3">
          <ServicesList slug={slug} services={servicesLink} />
        </div>

        <div className="grid w-full grid-cols-5 gap-x-16 gap-y-8">
          <h1 className="col-span-5 text-3xl sm:text-4xl md:text-5xl">
            {serviceData[0].title}
          </h1>
          <div className="col-span-5 space-y-6">
            <RichText
              className="flex flex-col gap-4 text-xl tracking-wide"
              data={serviceData[0].body}
            />
          </div>
          {serviceData[0].package_type.length !== 0 && (
            <div className="col-span-5 space-y-6 py-8 md:py-16">
              {serviceData[0].package_type[0].__component ===
                "content.contact" && (
                <Contact package_type={serviceData[0].package_type} />
              )}
              {serviceData[0].package_type[0].__component ===
                "content.package-list" && ""}
              <PackagesList package_type={serviceData[0].package_type} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
