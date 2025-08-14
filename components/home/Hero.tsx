import Image from "next/image";
import { Button } from "../ui/button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const devicesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Hero animations
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelector("h1"),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

  const projects = [
    {
      image: "/projects/garzasoft.png",
    },
    {
      image: "/projects/subastas.png",
    },
    {
      image: "/projects/mrpaleta.png",
    },
    {
      image: "/projects/gesrest.png",
    },
    {
      image: "/projects/360sys.png",
    },
  ];

  return (
    <section ref={heroRef} className="px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-7xl font-extrabold text-foreground text-center mb-8 md:mb-16 leading-tight font-segoe px-4">
          Impulsa tus negocios con
          <br />
          soluciones digitales innovadoras
        </h1>

        {/* Device Mockups */}
        <div
          ref={devicesRef}
          className="relative flex justify-center items-center mb-8 md:mb-16 px-4"
        >
          <div className="flex gap-0 overflow-x-auto md:overflow-visible pt-10">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`relative w-48 h-60 md:w-64 md:h-80 flex-shrink-0 -mr-4 last:mr-0 rounded-xl overflow-hidden duration-300 transition-transform hover:scale-105 ${
                  index % 2 === 0 ? "-mt-10" : ""
                }`}
              >
                <Image
                  src={project.image}
                  alt={`Project ${index + 1}`}
                  className={`object-cover flex-shrink-0 `}
                  fill
                />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mb-8 px-4">
          <p className="text-blackone font-medium text-base md:text-lg mb-6 max-w-2xl mx-auto font-poppins">
            Desarrollamos software a medida y productos tecnológicos para
            empresas de todos los tamaños.
          </p>
          <Link href="/contacto">
            <Button
              variant="secondary"
              size="lg"
              className="font-normal rounded-xl"
            >
              Contáctanos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
