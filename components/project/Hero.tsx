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
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Hero({
  background,
  foreground = "#000000",
  link,
  title,
  description,
  images,
}: {
  background: string;
  foreground: string;
  link: string;
  title: string;
  description: string;
  images: string[];
}) {
  const autoplay = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  // Puedes pasarle opciones como { forceWheelAxis: 'x', target: ... }

  return (
    <section className="w-full flex flex-col items-center justify-center gap-6">
      <div className="flex justify-between items-center w-full border-b">
        <h1 className="text-4xl font-bold pb-2 px-8 w-full">{title}</h1>
        <Link href={link} target="_blank">
          <Button
            variant="ghost"
            style={{ backgroundColor: background, color: foreground }}
            size={"sm"}
          >
            Visitar Web
          </Button>
        </Link>
      </div>
      <div className="flex justify-end w-full">
        <p className="md:w-2/3 text-xs md:text-base text-end">{description}</p>
      </div>

      <div className="relative w-full">
        <Carousel
          plugins={[autoplay.current]} // ⬅️ Aquí ambos plugins
          className="w-full"
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          opts={{
            loop: false,
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

          <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-2 z-10" />
          <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-2 z-10" />
        </Carousel>
      </div>
    </section>
  );
}
