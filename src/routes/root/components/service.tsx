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
      <h1 className="line-clamp-1 text-2xl text-custom-blue">{title}</h1>
      <p className="multiline-ellipsis max-h-[10.75rem] md:h-[200px] md:max-h-none md:text-xl">
        {body}
      </p>

      <div className="flex justify-end">
        <Link
          to={`/services/$slug`}
          params={{ slug: path }}
          className="flex w-fit items-center text-lg text-custom-blue"
        >
          <p>อ่านเพิ่มเติม</p>
          <ChevronRight />
        </Link>
      </div>
    </div>
  );
};

export default Service;
