interface ThirdSectionProps {
  title: string;
  description: string;
  button: string;
  path: string;
}

const ThirdSection = ({
  title,
  description,
  button,
  path,
}: ThirdSectionProps) => {
  return (
    <div className="container my-24 space-y-12 text-center md:my-36">
      <h1 className="text-5xl md:text-6xl">{title}</h1>
      <p className="text-xl font-medium">{description}</p>
      <a href={path}>
        <button className="mt-12 cursor-pointer rounded-2xl bg-[#FFC940] px-20 py-3 text-lg font-bold">
          {button}
        </button>
      </a>
    </div>
  );
};

export default ThirdSection;
