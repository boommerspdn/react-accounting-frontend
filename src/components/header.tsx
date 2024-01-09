interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <div className="bg-custom-yellow w-full h-24 my-12">
      <div className="container flex items-center h-full">
        <h2 className="text-4xl sm:text-5xl md:text-6xl">{title}</h2>
      </div>
    </div>
  );
};

export default Header;
