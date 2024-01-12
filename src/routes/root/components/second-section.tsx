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
      <div className="container grid grid-cols-1 gap-x-12 py-10 md:grid-cols-2 md:py-16">
        <div className="flex justify-center">
          <div className="relative aspect-[3/2] w-full sm:w-3/4 md:w-full">
            <img
              className="rounded object-cover"
              src={`${import.meta.env.VITE_API_URL}${image_url}`}
              alt={alt || "Why you should work with us"}
            />
          </div>
        </div>
        <div className="space-y-4 pt-8">
          <h1 className="text-3xl text-custom-yellow md:text-4xl xl:text-5xl">
            {title}
          </h1>
          <p className="text-xl text-white xl:text-2xl">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
