import { HomePageType, ServiceCard } from "@/types";
import { useLoaderData } from "@tanstack/react-router";
import FirstSection from "./components/first-section";
import HeroBanner from "./components/hero-banner";
import HeroSection from "./components/hero-section";
import SecondSection from "./components/second-section";
import ThirdSection from "./components/third-section";
import { Helmet } from "react-helmet-async";

const HomePage = () => {
  const { home, services } = useLoaderData({ from: "/" }) as {
    home: HomePageType;
    services: ServiceCard[];
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Fast on Time Accounting",
    url: "https://fastontime.co.th/",
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{home.SEO.title}</title>
        <meta name="description" content={home.SEO.description} />
        <link rel="canonical" href="https://fastontime.co.th" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Helmet>
      <div className="flex flex-col">
        <HeroBanner
          url={home.banner_image.url}
          alt={home.banner_image.alternativeText || "Hero Background"}
          title={home.banner_text}
          description={home.banner_description}
          button={home.banner_button}
        />
        <HeroSection
          left={{
            title: home.banner_section_title_1,
            description: home.banner_section_description_1,
          }}
          center={{
            title: home.banner_section_title_2,
            description: home.banner_section_description_2,
          }}
          right={{
            title: home.banner_section_title_3,
            description: home.banner_section_description_3,
          }}
        />
        <FirstSection
          title={home.section_1_title}
          description={home.section_1_description}
          services={services}
          promotions={home.promotion_ads}
        />
        <SecondSection
          title={home.section_2_title}
          description={home.section_2_body}
          image_url={home.section_2_image.url}
          alt={home.section_2_image.alternativeText || ""}
        />
        <ThirdSection
          title={home.section_3_title}
          description={home.section_3_body}
          button={home.section_3_button}
          path={home.section_3_button_url}
        />
      </div>
    </>
  );
};

export default HomePage;
