"use client";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Project } from "@/lib/project.interface";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ProjectMarkdown } from "@/lib/projects";

interface Props {
  data: ProjectMarkdown;
}

export function ProjectGallery({ data }: Props) {
  const { frontmatter: project, slug } = data;
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="w-full">
      <Carousel
        opts={{ loop: true }}
        setApi={setApi}
        className="w-full relative"
      >
        <CarouselContent className="ml-0">
          {project.gallery.map((image, index) => (
            <CarouselItem key={index} className="w-full pl-0">
              <img
                className="h-[450px] object-cover"
                src={image.split(",").shift()}
                alt={`Project image ${index + 1}`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="text-center text-sm absolute bottom-0 p-2 left-0 w-full h-fit">
          <div className="bg-white/75 dark:bg-black/60 rounded-2xl h-full p-4 backdrop-blur-md  flex flex-col gap-4">
            <Link
              href={`/servicios/${slug}`}
              className="flex flex-col items-start justify-start"
            >
              <p className="text-base md:text-lg font-bold">
                Sitio web ya implementado
              </p>
              <p className="text-start font-normal text-xs md:text-sm">
                El resultado final: una web funcional, responsiva y publicada,
                fiel al diseño original. Transformamos el diseño en una
                experiencia real y navegable.
              </p>
            </Link>
            <div className="flex justify-end">
              {Array(count)
                .fill(0)
                .map((_, index) => (
                  <span
                    key={index}
                    className={cn(
                      "inline-block h-2.5 mx-0.5 rounded-full",
                      index === current - 1 ? "w-6" : "w-2.5"
                    )}
                    style={{
                      backgroundColor: project.color,
                    }}
                  />
                ))}
            </div>
          </div>
        </div>
        <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-2 z-10" />
        <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-2 z-10" />
      </Carousel>
    </div>
  );
}
