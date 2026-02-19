import { useLoaderData } from "@tanstack/react-router";
import Header from "@/components/header";
import RichText from "@/components/rich-text";
import { Helmet } from "react-helmet-async";

const AboutPage = () => {
  const aboutUsData = useLoaderData({ from: "/about-us" });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{aboutUsData.SEO.title}</title>
        <meta name="description" content={aboutUsData.SEO.description} />
        <link rel="canonical" href="https://fastontime.co.th/about-us" />
      </Helmet>
      <div className="py-16">
        <Header title={aboutUsData.header} />
        <div className="container grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2 lg:gap-4">
          <div className="col-span-1 h-fit">
            <RichText data={aboutUsData.body} className="space-y-4 text-xl" />
          </div>
          <div className="relative h-[19rem] sm:h-[22rem]">
            <div className="absolute -top-20 ms-[10%] hidden aspect-[3/2] w-[90%] rounded-3xl bg-custom-blue lg:block" />
            <div className="absolute aspect-[3/2] w-full max-w-lg md:inset-0 md:mx-auto lg:-top-28 lg:ms-[2.25rem] lg:w-[90%] lg:max-w-none">
              <div className="relative h-full w-full">
                {aboutUsData.header_image && (
                  <img
                    src={`${aboutUsData.header_image.url}`}
                    alt={
                      aboutUsData.header_image.alternativeText || "Header Image"
                    }
                    className="h-full w-full rounded-3xl object-cover shadow-2xl"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="space-y-8 md:-top-12 lg:col-span-2">
            <div className="relative sm:w-fit">
              <h1 className="text-3xl md:text-5xl">
                {aboutUsData.reason_title}
              </h1>
              <div className="absolute right-0 mt-2 h-2 w-60 bg-custom-yellow sm:-right-24" />
            </div>
            <RichText
              className="px-6 text-xl 2xl:px-0"
              data={aboutUsData.reason_body}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
