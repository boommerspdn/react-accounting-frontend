"use client";
import Image from "next/image";
import Link from "next/link";
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
          link: ({ children, url }) => <Link href={url}>{children}</Link>,
          heading: ({ children, level }) => {
            switch (level) {
              case 1:
                return <h1 className="text-7xl">{children}</h1>;
              case 2:
                return <h2 className="text-6xl">{children}</h2>;
              case 3:
                return <h3 className="text-5xl">{children}</h3>;
              case 4:
                return <h4 className="text-4xl">{children}</h4>;
              case 5:
                return <h5 className="text-3xl">{children}</h5>;
              case 6:
                return <h6 className="text-2xl">{children}</h6>;
            }
          },
          paragraph: ({ children }) => {
            return <p>{children}</p>;
          },
          image: ({ image }) => {
            return (
              <div className="relative w-full aspect-[4/2] my-3 rounded-sm">
                <Image
                  src={image.url}
                  alt={image.alternativeText || "Image for paragraph"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
                  className="object-cover"
                />
              </div>
            );
          },
          list: ({ format, children }) => {
            if (format === "unordered")
              return (
                <ul className={cn(`list-disc space-y-5`, listSpaceClass)}>
                  {children}
                </ul>
              );
            if (format === "ordered")
              return (
                <ol className={cn(`list-decimal space-y-5`, listSpaceClass)}>
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
