"use client";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { useRef } from "react";
import { services } from "@/lib/services";
import { ItemInformation } from "./ItemInformation";
import { useSearchParams } from "next/navigation";

export const Services = () => {
  const { get } = useSearchParams();
  const service = get("s");

  const currentService = services.find((s) => s.slug === service);

  const wheel = useRef(WheelGesturesPlugin({ forceWheelAxis: "y" }));

  return (
    <div className="relative w-full h-full md:min-h-[750px]">
      <Carousel
        plugins={[wheel.current]}
        className="w-full h-full rounded-4xl my-6 overflow-hidden"
        orientation="vertical"
        opts={{ loop: false }}
      >
        <CarouselContent className="w-full h-[800px]">
          {services.map((service, index) => (
            <CarouselItem key={index} className="w-full h-fit">
              <ItemInformation service={service} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
