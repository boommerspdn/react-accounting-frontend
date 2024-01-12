type section = {
  title: string;
  description: string;
};

interface HeroSectionProps {
  left: section;
  center: section;
  right: section;
}

const HeroSection = ({ left, center, right }: HeroSectionProps) => {
  return (
    <section className="bg-custom-blue text-white">
      <div className="container grid grid-cols-1 sm:h-48 sm:grid-cols-3">
        <div className="flex flex-col justify-center border-b-8 border-white py-9 sm:my-11 sm:border-b-0 sm:border-e-8 sm:py-0">
          <span className="text-2xl text-custom-yellow">{left.title}</span>
          <span className="text-xl">{left.description}</span>
        </div>
        <div className="flex flex-col justify-center border-b-8 border-white py-9 sm:my-11 sm:border-b-0 sm:border-e-8 sm:py-0 sm:ps-8">
          <span className="text-2xl text-custom-yellow">{center.title}</span>
          <span className="text-xl">{center.description}</span>
        </div>
        <div className="flex flex-col justify-center pb-14 pt-9 sm:my-11 sm:py-0 sm:ps-8">
          <span className="text-2xl text-custom-yellow">{right.title}</span>
          <span className="text-xl">{right.description}</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
