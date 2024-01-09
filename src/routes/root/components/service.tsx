import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

interface ServiceProps {
  title: string;
  body: string;
  path: string;
}

const Service = ({ title, body, path }: ServiceProps) => {
  return (
    <div className="min-w-[300px] space-y-2">
      <h1 className="text-2xl text-custom-blue">{title}</h1>
      <p className="md:text-xl max-h-[10.75rem] md:max-h-none md:h-[200px] multiline-ellipsis">
        {body}
      </p>

      <div className="flex justify-end">
        <Link
          to={`/services/$slug`}
          params={{slug: path}}
          className="flex items-center text-custom-blue text-lg w-fit"
        >
          <p>อ่านเพิ่มเติม</p>
          <ChevronRight />
        </Link>
      </div>
    </div>
  );
};

export default Service;
