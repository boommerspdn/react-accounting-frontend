import { useParams } from "@tanstack/react-router";

const ServicesPage = () => {
  const { slug } = useParams({ strict: false });
  return <div className="py-16">{slug}</div>;
};

export default ServicesPage;
