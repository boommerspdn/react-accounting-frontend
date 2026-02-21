import { getImageSrc } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

interface HeroBannerProps {
  url: string;
  alt: string;
  title: string;
  description: string;
  button: string;
}

const HeroBanner = ({
  url,
  alt,
  title,
  description,
  button,
}: HeroBannerProps) => {
  return (
    <div className="relative flex h-[700px] w-full items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-y-12">
        <div className="z-30 text-center text-4xl text-white md:text-5xl lg:text-6xl">
          {title}
        </div>
        <div className="z-30 text-center text-lg text-white lg:text-xl">
          {description}
        </div>
        <Link to="/contact-us">
          <button className="z-30 cursor-pointer rounded-2xl bg-[#FFC940] px-10 py-3 font-bold md:text-lg">
            {button}
          </button>
        </Link>
      </div>
      <div className="absolute -z-40 h-full w-full bg-black opacity-70 " />
      <img
        src={getImageSrc(url)}
        alt={alt}
        className="absolute -z-50 h-full w-full object-cover"
      />
    </div>
  );
};

export default HeroBanner;
