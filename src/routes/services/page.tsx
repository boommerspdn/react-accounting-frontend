import Contact from "@/components/contact";
import Header from "@/components/header";
import RichText from "@/components/rich-text";
import { ServiceLinkType, ServicePageType } from "@/types";
import { useLoaderData, useParams } from "@tanstack/react-router";
import PackagesList from "./components/packages-list";
import ServicesList from "./components/services-list";

const ServicesPage = () => {
  const { slug } = useParams({ strict: false });
  const { service, servicesLink } = useLoaderData({
    from: "/services/$slug",
  }) as { service: ServicePageType[]; servicesLink: ServiceLinkType[] };

  return (
    <div className="py-16">
        <Header title={service[0].name} />
        <div className="container relative flex flex-row gap-2">
          <div className="sticky top-[80px] hidden h-full w-[280px] text-xl sm:inline-flex md:flex md:shrink-0 md:flex-col md:gap-3">
            <ServicesList slug={slug ?? ""} services={servicesLink} />
          </div>

          <div className="grid w-full grid-cols-5 gap-x-16 gap-y-8">
            <h1 className="col-span-5 text-3xl sm:text-4xl md:text-5xl">
              {service[0].title}
            </h1>
            <div className="col-span-5 space-y-6">
              <RichText
                className="flex flex-col gap-4 text-xl tracking-wide"
                data={service[0].body}
              />
            </div>
            {service[0].package_type.length !== 0 && (
              <div className="col-span-5 space-y-6 py-8 md:py-16">
                {service[0].package_type[0].__component ===
                  "content.contact" && (
                  <Contact package_type={service[0].package_type} />
                )}
                {service[0].package_type[0].__component ===
                  "content.package-list" && ""}
                <PackagesList package_type={service[0].package_type} />
              </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default ServicesPage;
