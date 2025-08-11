"use client";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { useRef } from "react";
import { services } from "@/lib/services";
import { ItemInformation } from "./ItemInformation";

export const Services = () => {
  const autoplay = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const wheel = useRef(WheelGesturesPlugin({ forceWheelAxis: "y" }));

  return (
    <div className="relative w-full h-full md:min-h-[750px]">
      <Carousel
        plugins={[autoplay.current, wheel.current]}
        className="w-full h-full"
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        opts={{ loop: true }}
      >
        <CarouselContent className="w-full h-full">
          {services.map((service, index) => (
            <CarouselItem key={index} className="w-full h-full">
              <ItemInformation service={service} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
