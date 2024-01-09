interface SecondSectionProps {
  title: string;
  description: string;
  image_url: string;
  alt: string;
}

const SecondSection = ({
  title,
  description,
  image_url,
  alt,
}: SecondSectionProps) => {
  return (
    <div className="bg-custom-blue">
      <div className="container grid grid-cols-1 md:grid-cols-2 py-10 md:py-16 gap-x-12">
        <div className="flex justify-center">
          <div className="relative w-full sm:w-3/4 md:w-full aspect-[3/2]">
            <img
              className="object-cover rounded"
              src={`${import.meta.env.VITE_API_URL}${image_url}`}
              alt={alt || "Why you should work with us"}
            />
          </div>
        </div>
        <div className="pt-8 space-y-4">
          <h1 className="text-custom-yellow text-3xl md:text-4xl xl:text-5xl">
            {title}
          </h1>
          <p className="text-white text-xl xl:text-2xl">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
