import Header from "@/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SocialType } from "@/types";
import { useLoaderData } from "@tanstack/react-router";
import ContactForm from "./components/contact-form";
import { Helmet } from "react-helmet-async";

const ContactPage = () => {
  const { contact: contactUsData, socials } = useLoaderData({
    from: "/contact-us",
  }) as { contact: any; socials: SocialType[] };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{contactUsData.SEO.title}</title>
        <meta name="description" content={contactUsData.SEO.description} />
        <link rel="canonical" href="https://bprservice.co.th/contact-us" />
      </Helmet>
      <div className="py-16">
        <Header title={contactUsData.header} />
        <div className="container grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="space-y-2 text-center lg:col-span-3 lg:text-start">
            <h1 className="pb-4 text-4xl">{contactUsData.sub_header}</h1>
            <div className="space-y-1">
              <h2 className="text-2xl text-custom-blue">
                {contactUsData.company_name_title}
              </h2>
              <p>{contactUsData.company_name_body}</p>
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl text-custom-blue">
                {contactUsData.company_address_title}
              </h2>
              <p>{contactUsData.company_address_body}</p>
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl text-custom-blue">
                {contactUsData.company_phone_title}
              </h2>
              <p>{contactUsData.company_phone_body}</p>
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl text-custom-blue">
                {contactUsData.company_email_title}
              </h2>
              <p>{contactUsData.company_email_body}</p>
            </div>
            <div className="flex h-fit justify-center gap-4 pt-3 lg:justify-start">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url || "/"}
                  target="_blank"
                  className="h-fit"
                >
                  <img
                    src={`${import.meta.env.VITE_API_URL}${social.image.url}`}
                    alt={social.platform || "Social Media"}
                    width={35}
                    height={35}
                  />
                </a>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{contactUsData.message_title}</CardTitle>
                <CardDescription>
                  {contactUsData.message_description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm emailToRecieve={contactUsData.email_to_receive} />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-5">
            <iframe
              src={contactUsData.google_map_embed_src}
              title="ที่อยู่บริษัท"
              width="100%"
              height="450"
              style={{ border: 0 }}
              aria-hidden="false"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
