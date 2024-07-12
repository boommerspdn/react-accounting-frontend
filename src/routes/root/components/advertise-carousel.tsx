import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ImageType } from "@/types";

const AdvertiseCarousel = ({
  className,
  promotions,
}: {
  className?: string;
  promotions: ImageType[];
}) => {
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3500,
          stopOnInteraction: false,
        }),
      ]}
      className={className}
    >
      <CarouselContent>
        {promotions.map((promotion) => (
          <CarouselItem key={promotion.name}>
            <img
              src={`${import.meta.env.VITE_API_URL}${promotion.url}`}
              alt={promotion.alternativeText || "promotion"}
              className=" w-full rounded object-contain"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default AdvertiseCarousel;
