import RichText from "@/components/rich-text";
import { cn } from "@/lib/utils";

interface PackageListProps {
  package_type: {
    id: number;
    __component: string;
    package_name: string;
    package_body: Array<any>;
    button_label: string;
    button_path: string;
    is_main: boolean;
    package_price: string;
    package_price_unit: string;
  }[];
}

const PackagesList = ({ package_type }: PackageListProps) => {
  const packageList = package_type.filter(
    (item) => item.__component === "content.package-list",
  );

  return (
    <div className="flex flex-wrap justify-center gap-8 2xl:gap-16">
      {packageList.map((item) => (
        <div
          key={item.id}
          className={cn(
            `relative flex min-h-[26rem] w-64 flex-col justify-between gap-4 rounded-3xl border-[1px] border-border p-4 shadow-xl`,
            item.is_main === true
              ? "bg-custom-blue text-white 2xl:-top-6"
              : "bg-white",
          )}
        >
          <div className="text-center">
            <h1 className="text-xl">{item.package_name}</h1>
            <div className="space-x-1">
              <span
                className={cn(
                  `text-xl font-semibold`,
                  item.is_main ? "text-white" : "text-custom-blue",
                )}
              >
                {item.package_price}
              </span>
              <span
                className={`text-base ${
                  item.is_main ? "text-custom-yellow" : "text-muted-foreground"
                }`}
              >
                {item.package_price_unit}
              </span>
            </div>
          </div>
          <div className="flex-grow">
            <RichText data={item.package_body} listSpaceClass="space-y-2" />
          </div>
          <div className="text-center">
            <a href={item.button_path} target="_blank" className="">
              <button
                className={cn(
                  `rounded-2xl px-8 py-1`,
                  !item.is_main
                    ? "bg-custom-blue text-white"
                    : "bg-custom-yellow text-black",
                )}
              >
                {item.button_label}
              </button>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PackagesList;
