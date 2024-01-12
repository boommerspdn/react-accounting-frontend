import { HomePageType, Services } from "@/types";
import { useLoaderData } from "@tanstack/react-router";
import HeroBanner from "./components/hero-banner";
import HeroSection from "./components/hero-section";
import FirstSection from "./components/first-section";
import SecondSection from "./components/second-section";
import ThirdSection from "./components/third-section";
import { useSWRFetch } from "@/lib/data";

const HomePage = () => {
  const content = useLoaderData({ from: "/" }) as HomePageType;
  const { data: services } = useSWRFetch<Services>("/api/accounting-services", {
    "fields[0]": "name",
    "fields[1]": "description",
    "fields[2]": "slug",
  });

  return (
    <div className="flex flex-col">
      <HeroBanner
        url={content.data.attributes.banner_image.data.attributes.url}
        alt={
          content.data.attributes.banner_image.data.attributes
            .alternativeText || "Hero Background"
        }
        title={content.data.attributes.banner_text}
        description={content.data.attributes.banner_description}
        button={content.data.attributes.banner_button}
      />
      <HeroSection
        left={{
          title: content.data.attributes.banner_section_title_1,
          description: content.data.attributes.banner_section_description_1,
        }}
        center={{
          title: content.data.attributes.banner_section_title_2,
          description: content.data.attributes.banner_section_description_2,
        }}
        right={{
          title: content.data.attributes.banner_section_title_3,
          description: content.data.attributes.banner_section_description_3,
        }}
      />
      <FirstSection
        title={content.data.attributes.section_1_title}
        description={content.data.attributes.section_1_description}
        services={services}
      />
      <SecondSection
        title={content.data.attributes.section_2_title}
        description={content.data.attributes.section_2_body}
        image_url={content.data.attributes.section_2_image.data.attributes.url}
        alt={
          content.data.attributes.section_2_image.data.attributes
            .alternativeText || ""
        }
      />
      <ThirdSection
        title={content.data.attributes.section_3_title}
        description={content.data.attributes.section_3_body}
        button={content.data.attributes.section_3_button}
        path={content.data.attributes.section_3_button_url}
      />
    </div>
  );
};

export default HomePage;
