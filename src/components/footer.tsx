import { getImageSrc } from "@/lib/utils";
import { LayoutContentType } from "@/types";
import { Link, useLoaderData } from "@tanstack/react-router";

const Footer = () => {
  const { navbar, services, footer, socials }: LayoutContentType =
    useLoaderData({
      from: "__root__",
    });

  return (
    <div className="border-t-[1px] border-border bg-[#E9E9E9]">
      <div className="container flex h-full flex-col justify-between pb-4">
        <div className="mb-10 mt-14 flex flex-col gap-10 md:flex-row md:gap-5 xl:gap-20">
          <div className="space-y-2 md:max-w-xs lg:max-w-md">
            <h1 className="text-xl">{footer.company_info}</h1>
            <div className="flex gap-2">
              <img
                src={getImageSrc(navbar.logo.url)}
                alt={navbar.logo.url || "Logo"}
                width={25}
                height={25}
              />
              <p>{footer.company_name}</p>
            </div>
            <div className="flex items-start gap-2">
              <img
                src={"/location.svg"}
                alt="Location"
                width={25}
                height={25}
              />
              <p>{footer.company_address}</p>
            </div>
            <div className="flex gap-2">
              <img
                src={"/phone.svg"}
                alt="Phone number"
                width={25}
                height={25}
              />
              <p>{footer.company_phone_number}</p>
            </div>
            <div className="flex gap-2">
              <img src={"/email.svg"} alt="Email" width={25} height={25} />
              <p> {footer.company_email}</p>
            </div>
          </div>
          <div className="flex max-w-md flex-col gap-2">
            <h1 className="text-xl">ลิงค์เว็บไซท์</h1>
            <Link to={"/"} className="w-fit">
              {navbar.home}
            </Link>
            <Link
              to={"/services/$slug"}
              params={{ slug: services[0].slug }}
              className="w-fit"
            >
              {navbar.service}
            </Link>
            <Link to={"/about-us"} className="w-fit">
              {navbar.about_us}
            </Link>
            <Link to={"/contact-us"} className="w-fit">
              {navbar.contact_us}
            </Link>
          </div>
          <div className="flex max-w-md flex-col gap-2">
            <h1 className="text-xl">บริการของเรา</h1>
            {services.map((service) => (
              <Link
                to={`/services/$slug`}
                params={{ slug: service.slug }}
                className="w-fit"
                key={service.slug}
              >
                <p>{service.name}</p>
              </Link>
            ))}
          </div>
          <div className="flex h-fit gap-4">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.url || "/"}
                target="_blank"
                className="h-fit"
              >
                <img
                  src={getImageSrc(social.image.url)}
                  alt={social.platform || "Social Media"}
                  width={35}
                  height={35}
                />
              </a>
            ))}
          </div>
        </div>
        <p className="text-center text-sm sm:text-base">{footer.copyright}</p>
      </div>
    </div>
  );
};

export default Footer;
