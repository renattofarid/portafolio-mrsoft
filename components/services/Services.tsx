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

  // detectar móvil para orientación/gesto
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Services.tsx (solo los cambios)
  useEffect(() => {
    if (!api) return;
    setCount(services.length); // << antes: api.scrollSnapList().length
    const update = () => setCurrent(api.selectedScrollSnap() + 1);
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;
    api.scrollTo(startIndex, true); // sync con ?s=
  }, [api, startIndex]);

  // altura fija por breakpoint para TODAS las cards
  const cardHeightClass = "h-[670px] md:h-[720px]";

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        plugins={[
          WheelGesturesPlugin({
            forceWheelAxis: isMobile ? "x" : "y",
          }),
        ]}
        className="w-full rounded-4xl my-6"
        orientation={isMobile ? "horizontal" : "vertical"}
        opts={{ loop: false, startIndex }}
      >
        <CarouselContent className="w-full">
          {services.map((service, index) => (
            <CarouselItem key={index} className={cn("w-full", cardHeightClass)}>
              <ItemInformation service={service} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Dots SOLO en móvil */}
        <div className="flex justify-center items-center p-2 md:hidden absolute left-1/2 -translate-x-1/2 bottom-2">
          {Array(count)
            .fill(0)
            .map((_, index) => (
              <span
                key={index}
                className={cn(
                  "inline-block h-2.5 mx-0.5 rounded-full transition-all w-2.5",
                  index === current - 1 ? "bg-[#50B7D0]" : "bg-[#A9D6E1]"
                )}
              />
            ))}
        </div>
      </Carousel>
    </div>
  );
};
