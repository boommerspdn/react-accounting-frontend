interface ContactProps {
  package_type: {
    id: number;
    __component: string;
    title: string;
    description: string;
    button_label: string;
    button_path: string;
  }[];
}

const Contact = ({ package_type }: ContactProps) => {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <h1 className="text-3xl md:text-5xl">{package_type[0].title}</h1>
      <p className="text-xl">{package_type[0].description}</p>
      <a
        href={`${package_type[0].button_path}`}
        target="_blank"
        className="rounded-2xl bg-[#FFC940] px-10 py-3 font-bold md:text-lg"
      >
        {package_type[0].button_label}
      </a>
    </div>
  );
};

export default Contact;
