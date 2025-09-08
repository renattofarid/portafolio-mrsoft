"use client";

import { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi, // 👈 importante
} from "../ui/carousel";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { ProjectMarkdown } from "@/lib/projects";
import ItemProject from "./ItemProject";
import { ProjectGallery } from "./ProjectGallery";
import { Safari } from "../safari";
import gsap from "gsap";

interface Props {
  projects: ProjectMarkdown[];
}

export default function Projects({ projects }: Props) {
  const wheel = useRef(WheelGesturesPlugin({ forceWheelAxis: "y" }));
  const [projectSelected, setProjectSelected] =
    useState<ProjectMarkdown | null>(null);

  const detailRef = useRef<HTMLDivElement>(null);
  const [embla, setEmbla] = useState<CarouselApi | null>(null); // 👈 guardar api de Embla

  useEffect(() => {
    if (!projectSelected && projects.length > 0) {
      setProjectSelected(projects[0]);
    }
  }, [projects, projectSelected]);

  // Animación
  useEffect(() => {
    if (detailRef.current) {
      gsap.fromTo(
        detailRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [projectSelected]);

  // 👇 cuando cambie el seleccionado, centrarlo en móvil
  useEffect(() => {
    if (!embla || !projectSelected) return;

    const index = projects.findIndex((p) => p.slug === projectSelected.slug);

    if (index !== -1 && window.innerWidth < 768) {
      embla.scrollTo(index); // centra el slide
    }
  }, [projectSelected, embla, projects]);

  return (
    <div>
      <Carousel
        plugins={[wheel.current]}
        className="w-full h-full my-4 bg-[#D7D7D7] dark:bg-[#2d2d2d] rounded-xl"
        opts={{ loop: true }}
        setApi={setEmbla} // 👈 recibimos la instancia aquí
      >
        <CarouselContent className="w-full h-full p-2">
          {projects.map((project, index) => (
            <CarouselItem
              key={index}
              className="w-fit md:w-full h-full basis-auto md:basis-1/6"
            >
              <ItemProject
                projectSelected={projectSelected?.slug === project.slug}
                onClick={setProjectSelected}
                project={project}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="min-h-[500px]">
        {projectSelected && (
          <div ref={detailRef}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-6 mt-4">
              <div className="col-span-1 bg-gray-200 dark:bg-[#2d2d2d] rounded-xl p-4 flex flex-col gap-6">
                <div className="w-full h-full flex justify-center items-center">
                  <Safari
                    url={projectSelected.frontmatter.client}
                    className="size-full"
                    imageSrc={projectSelected.frontmatter.figma}
                  />
                </div>
                <div className="bg-white/75 dark:bg-black/60 rounded-2xl h-fit p-4 backdrop-blur-md">
                  <p className="text-base md:text-lg font-bold">
                    Del diseño al desarrollo
                  </p>
                  <p className="text-xs md:text-sm">
                    Creamos un diseño visual completo, pensado en la experiencia
                    del usuario, la estructura y la identidad de tu marca.
                  </p>
                </div>
              </div>

              <div className="col-span-2 rounded-xl overflow-hidden">
                <ProjectGallery data={projectSelected} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
