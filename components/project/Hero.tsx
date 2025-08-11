"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export function Hero({
  title,
  description,
  images,
}: {
  title: string;
  description: string;
  images: string[];
}) {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <section className="w-full flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold border-b pb-2 px-8 w-full">{title}</h1>
      <div className="flex justify-end w-full">
        <p className="md:w-2/3 text-xs md:text-base text-end">{description}</p>
      </div>

      <div className="relative w-full">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent className="w-full ml-0">
            {images.map((image, index) => (
              <CarouselItem key={index} className="w-full pl-0">
                <div className="p-1">
                  <img
                    src={image.split(",")[0] || ""}
                    alt={`Imagen ${index + 1}`}
                    className="w-full h-64 md:h-[700px] object-cover rounded object-top-left"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Botones centrados verticalmente */}
          <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-2 z-10" />
          <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-2 z-10" />
        </Carousel>
      </div>
    </section>
  );
}
