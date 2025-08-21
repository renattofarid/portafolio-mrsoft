"use client";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { services } from "@/lib/services";
import { ItemInformation } from "./ItemInformation";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export const Services = () => {
  const searchParams = useSearchParams();
  const service = searchParams.get("s");

  const currentService = services.find((s) => s.slug === service);

  const [api, setApi] = useState<CarouselApi>();
  const startIndex = currentService
    ? services.findIndex((s) => s.slug === currentService.slug)
    : 0;
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

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
        setApi={setApi}
        plugins={[
          WheelGesturesPlugin({
            forceWheelAxis: isMobile ? "x" : "y", // horizontal solo en móviles
          }),
        ]}
        className="w-full h-full rounded-4xl my-6 overflow-hidden"
        orientation={isMobile ? "horizontal" : "vertical"}
        opts={{ loop: false, startIndex }}
      >
        <CarouselContent className="w-full min-h-[670px] md:min-h-[850px] md:h-[800px]">
          {services.map((service, index) => (
            <CarouselItem key={index} className="w-full h-full">
              <ItemInformation service={service} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center p-2">
          {Array(count)
            .fill(0)
            .map((_, index) => (
              <span
                key={index}
                className={cn(
                  "inline-block h-2.5 mx-0.5 rounded-full bg-primary",
                  index === current - 1 ? "w-6" : "w-2.5"
                )}
              />
            ))}
        </div>
      </Carousel>
    </div>
  );
};
