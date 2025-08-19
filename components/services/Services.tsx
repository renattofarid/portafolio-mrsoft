"use client";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { services } from "@/lib/services";
import { ItemInformation } from "./ItemInformation";
import { useSearchParams } from "next/navigation";

export const Services = () => {
  const searchParams = useSearchParams();
  const service = searchParams.get("s");

  const currentService = services.find((s) => s.slug === service);

  const startIndex = currentService
    ? services.findIndex((s) => s.slug === currentService.slug)
    : 0;

  // estado para detectar si es móvil
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="relative w-full h-full md:min-h-[750px]">
      <Carousel
        plugins={[
          WheelGesturesPlugin({
            forceWheelAxis: isMobile ? "x" : "y", // horizontal solo en móviles
          }),
        ]}
        className="w-full h-full rounded-4xl my-6 overflow-hidden"
        orientation={isMobile ? "horizontal" : "vertical"}
        opts={{ loop: false, startIndex }}
      >
        <CarouselContent className="w-full h-[850px] md:h-[800px]">
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
