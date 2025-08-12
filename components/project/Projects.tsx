"use client";

import { useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { ProjectMarkdown } from "@/lib/projects";
import ItemProject from "./ItemProject";
import { Project } from "@/lib/project.interface";
import { ProjectGallery } from "./ProjectGallery";
import { Safari } from "../safari";

interface Props {
  projects: ProjectMarkdown[];
}

export default function Projects({ projects }: Props) {
  const autoplay = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const wheel = useRef(WheelGesturesPlugin({ forceWheelAxis: "y" }));

  const [projectSelected, setProjectSelected] =
    useState<ProjectMarkdown | null>(null);

  useEffect(() => {
    if (!projectSelected && projects.length > 0) {
      setProjectSelected(projects[0]);
    }
  }, []);

  return (
    <div>
      <Carousel
        plugins={[autoplay.current, wheel.current]}
        className="w-full h-full my-4 bg-[#D7D7D7] dark:bg-[#2d2d2d] rounded-xl"
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        opts={{ loop: true }}
      >
        <CarouselContent className="w-full h-full p-2">
          {projects.map((project, index) => (
            <CarouselItem
              key={index}
              className="w-fit md:w-full h-full basis-auto md:basis-1/6"
            >
              <ItemProject onClick={setProjectSelected} project={project} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {projectSelected && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-6">
          <div className="col-span-1 bg-gray-200 dark:bg-[#2d2d2d] rounded-xl p-4 flex flex-col gap-6">
            <div className="w-full h-full flex justify-center items-center">
              {/* 1203 x 753 */}
              <Safari
                url={projectSelected.frontmatter.client}
                className="size-full"
                imageSrc={projectSelected.frontmatter.figma}
              />
            </div>
            <div className="bg-white/75 dark:bg-black/60 rounded-2xl h-fit p-4 backdrop-blur-md">
              <p className="text-base md:text-lg font-bold">Del diseño al desarrollo</p>
              <p className="text-xs md:text-sm">
                Creamos un diseño visual completo, pensado en la experiencia del
                usuario, la estructura y la identidad de tu marca.
              </p>
            </div>
          </div>

          <div className="col-span-2">
            <ProjectGallery data={projectSelected} />
          </div>
        </div>
      )}
    </div>
  );
}
