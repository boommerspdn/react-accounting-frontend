import { useLoaderData } from "@tanstack/react-router";
import { PostType } from "@/types";

const AboutPage = () => {
  const aboutData = useLoaderData({from: "/about-us"})
  console.log(aboutData)


  return <div className="text-3xl underline">
    {/* <h1>{aboutData[0].title}</h1> */}
  </div>;
};

export default AboutPage;
