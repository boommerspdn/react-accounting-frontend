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
    <div className="relative w-full h-[700px] flex justify-center items-center">
      <div className="container flex flex-col justify-center items-center gap-y-12">
        <div className="text-white text-4xl md:text-5xl lg:text-6xl text-center z-30">
          {title}
        </div>
        <div className="text-white text-lg lg:text-xl text-center z-30">
          {description}
        </div>
        <button className="py-3 px-10 rounded-2xl bg-[#FFC940] font-bold md:text-lg cursor-pointer z-30">
          {button}
        </button>
      </div>
      <div className="absolute w-full h-full bg-black -z-40 opacity-70 " />
      <img
        src={`${import.meta.env.VITE_API_URL}${url}`}
        alt={alt}
        className="absolute object-cover -z-50 w-full h-full"
      />
    </div>
  );
};

export default HeroBanner;
