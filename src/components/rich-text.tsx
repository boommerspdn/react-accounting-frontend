import { Link } from "@tanstack/react-router";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { cn } from "@/lib/utils";

interface RictTextProps {
  data: any;
  className?: string;
  listSpaceClass?: string;
}

const RichText = ({ data, className, listSpaceClass }: RictTextProps) => {
  return (
    <div className={className}>
      <BlocksRenderer
        content={data}
        blocks={{
          link: ({ children, url }) => <Link to={url}>{children}</Link>,
          heading: ({ children, level }) => {
            switch (level) {
              case 1:
                return (
                  <h1 className="text-7xl text-custom-blue">{children}</h1>
                );
              case 2:
                return (
                  <h2 className="text-6xl text-custom-blue">{children}</h2>
                );
              case 3:
                return (
                  <h3 className="text-5xl text-custom-blue">{children}</h3>
                );
              case 4:
                return (
                  <h4 className="text-4xl text-custom-blue">{children}</h4>
                );
              case 5:
                return (
                  <h5 className="text-3xl text-custom-blue">{children}</h5>
                );
              case 6:
                return (
                  <h6 className="text-2xl text-custom-blue">{children}</h6>
                );
            }
          },
          paragraph: ({ children }) => {
            return <p>{children}</p>;
          },
          image: ({ image }) => {
            return (
              <div className="relative mx-auto my-3 rounded-sm">
                <img
                  src={image.url}
                  alt={image.alternativeText || "Image for paragraph"}
                  className="object-contain"
                  height={"auto"}
                  width={700}
                />
              </div>
            );
          },
          list: ({ format, children }) => {
            if (format === "unordered")
              return (
                <ul className={cn(`list-disc space-y-4`, listSpaceClass)}>
                  {children}
                </ul>
              );
            if (format === "ordered")
              return (
                <ol className={cn(`list-decimal space-y-4`, listSpaceClass)}>
                  {children}
                </ol>
              );
          },
        }}
      />
    </div>
  );
};

export default RichText;
