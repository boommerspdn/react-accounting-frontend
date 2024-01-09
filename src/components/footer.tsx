import { LayoutContentType } from "@/types";
import { Link, useLoaderData } from "@tanstack/react-router";

const Footer = () => {
  const { navbar, services, footer, socials }: LayoutContentType = useLoaderData({
    from: "__root__",
  });

  return (
    <div className="bg-[#E9E9E9] border-border border-t-[1px]">
      <div className="container flex flex-col justify-between h-full pb-4">
        <div className="flex flex-col md:flex-row gap-10 md:gap-5 xl:gap-20 mt-14 mb-10">
          <div className="space-y-2 md:max-w-xs lg:max-w-md">
            <h1 className="text-xl">{footer.data.attributes.company_info}</h1>
            <div className="flex gap-2">
              <img
                src={`${import.meta.env.VITE_API_URL}${
                  navbar.data.attributes.logo.data.attributes.url
                }`}
                alt={navbar.data.attributes.logo.data.attributes.url || "Logo"}
                width={25}
                height={25}
              />
              <p>{footer.data.attributes.company_name}</p>
            </div>
            <div className="flex gap-2 items-start">
              <img
                src={"/location.svg"}
                alt="Location"
                width={25}
                height={25}
              />
              <p>{footer.data.attributes.company_address}</p>
            </div>
            <div className="flex gap-2">
              <img
                src={"/phone.svg"}
                alt="Phone number"
                width={25}
                height={25}
              />
              <p>{footer.data.attributes.company_phone_number}</p>
            </div>
            <div className="flex gap-2">
              <img src={"/email.svg"} alt="Email" width={25} height={25} />
              <p> {footer.data.attributes.company_email}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 max-w-md">
            <h1 className="text-xl">ลิงค์เว็บไซท์</h1>
            <Link to={"/"} className="w-fit">
              {navbar.data.attributes.home}
            </Link>
            <Link
              to={"/services/$slug"}
              params={{ slug: services.data[0].attributes.slug }}
              className="w-fit"
            >
              {navbar.data.attributes.service}
            </Link>
            <Link to={"/about-us"} className="w-fit">
              {navbar.data.attributes.about_us}
            </Link>
            <Link to={"/contact-us"} className="w-fit">
              {navbar.data.attributes.contact_us}
            </Link>
          </div>
          <div className="flex flex-col gap-2 max-w-md">
            <h1 className="text-xl">บริการของเรา</h1>
            {services.data.map((service) => (
              <Link
                to={`/services/$slug`}
                params={{ slug: service.attributes.slug }}
                className="w-fit"
                key={service.attributes.slug}
              >
                <p>{service.attributes.name}</p>
              </Link>
            ))}
          </div>
          <div className="flex gap-4 h-fit">
            {socials.data.map((social, index) => (
              <a
                key={index}
                href={social.attributes.url || "/"}
                target="_blank"
                className="h-fit"
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}${social.attributes.image.data.attributes.url}`}
                  alt={social.attributes.platform || "Social Media"}
                  width={35}
                  height={35}
                />
              </a>
            ))}
          </div>
        </div>
        <p className="text-center text-sm sm:text-base">
          {footer.data.attributes.copyright}
        </p>
      </div>
    </div>
  );
};

export default Footer;
