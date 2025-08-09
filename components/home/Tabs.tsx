"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

const galleryItems = [
  {
    id: 1,
    image: "/projects/gesrest.png",
    title: "Gestión de Restaurantes",
    product: "Gesrest",
  },
  {
    id: 2,
    image: "/projects/hotelhub.png",
    title: "Sistema de Hoteles",
    product: "Hotel Hub",
  },
  {
    id: 3,
    image: "/projects/360sys.png",
    title: "Punto de Venta",
    product: "360sys",
  },
  {
    id: 4,
    image: "/projects/mrpaleta.png",
    title: "E-commerce de Helados",
    product: "Mr. Paleta",
  },
  {
    id: 5,
    image: "/projects/subastas.png",
    title: "Subastas Online",
    product: "Subastas",
  },
  {
    id: 6,
    image: "/projects/pulso.png",
    title: "Sistema Médico",
    product: "Pulso +",
  },
];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("nosotros");

  const aboutRef = useRef<HTMLElement>(null);
  const devicesRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  function AnimatedCounter({
    end,
    duration = 2,
    suffix = "",
  }: {
    end: number;
    duration?: number;
    suffix?: string;
  }) {
    const [count, setCount] = useState(0);
    const countRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            gsap.to(
              { value: 0 },
              {
                value: end,
                duration: duration,
                ease: "power2.out",
                onUpdate: function () {
                  setCount(Math.floor(this.targets()[0].value));
                },
              }
            );
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );

      if (countRef.current) {
        observer.observe(countRef.current);
      }

      return () => observer.disconnect();
    }, [end, duration]);

    return (
      <div
        ref={countRef}
        className="text-5xl md:text-6xl font-medium text-blackone mb-2 font-segoe"
      >
        {count}
        <span className="text-secondary">{suffix}</span>
      </div>
    );
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);

    // Animate tab transition
    if (tab === "galeria" && galleryRef.current) {
      gsap.fromTo(
        galleryRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  };

  useEffect(() => {
    // Device mockups animation
    if (devicesRef.current) {
      gsap.fromTo(
        devicesRef.current.children,
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: devicesRef.current,
            start: "top 80%",
            end: "bottom 20%",
          },
        }
      );
    }

    // About section animation
    if (aboutRef.current) {
      gsap.fromTo(
        aboutRef.current.querySelector("h2"),
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        aboutRef.current.querySelector("p"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Gallery animation
    if (galleryRef.current && activeTab === "galeria") {
      gsap.fromTo(
        galleryRef.current.children,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }
  }, [activeTab]);

  return (
    <>
<div className="flex justify-center mb-8 md:mb-16 px-4">
  <div className="flex w-full max-w-sm md:w-auto bg-blackone/10 border border-border rounded-2xl p-1 shadow-sm">
    <Button
      onClick={() => handleTabChange("nosotros")}
      className={`flex-1 md:flex-none px-3 py-2 md:px-6 md:py-2 rounded-xl text-xs md:text-sm font-medium font-poppins whitespace-nowrap text-center transition-all duration-300 focus-visible:ring-0 focus-visible:ring-offset-0`}
      variant={activeTab === "nosotros" ? "black" : "ghost"}
    >
      Nosotros
    </Button>

    <Button
      onClick={() => handleTabChange("galeria")}
      className={`flex-1 md:flex-none px-3 py-2 md:px-6 md:py-2 rounded-xl text-xs md:text-sm font-medium font-poppins whitespace-nowrap text-center transition-all duration-300 focus-visible:ring-0 focus-visible:ring-offset-0`}
      variant={activeTab === "galeria" ? "black" : "ghost"}
    >
      Galería
    </Button>
  </div>
</div>


      {/* Content based on active tab */}
      {activeTab === "nosotros" ? (
        /* About Section */
        <section ref={aboutRef} className="px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-6xl border-b-4 font-extrabold text-blackone pb-6 md:mb-8 font-segoe px-4">
              ¿QUIÉNES SOMOS?
            </h2>

            <div className="flex justify-end w-full">
              <p className="w-full text-blackone font-medium text-base leading-tight mb-12 md:mb-16 max-w-4xl text-end font-poppins px-4">
                Mr. Soft es una empresa peruana con más de 20 años de
                experiencia en el desarrollo de software y soluciones
                tecnológicas a medida. Nos hemos propuesto acompañar a empresas
                de diferentes sectores en su transformación digital, brindando
                herramientas innovadoras que potencien sus objetivos y los
                orienten hacia el éxito. Mr. Soft, empresa peruana con más de 20
                años de experiencia en el desarrollo de software y soluciones
                tecnológicas a medida.
              </p>
            </div>

            {/* Statistics with animated counters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto px-4">
              {[
                {
                  end: 300,
                  label: "Proyectos Completados",
                },
                {
                  end: 150,
                  label: "Clientes Satisfechos",
                },
                {
                  end: 20,
                  label: "Años de Experiencia",
                },
                {
                  end: 15,
                  label: "Rubros Atendidos",
                },
              ].map((stat, idx) => (
                <div
                  className="flex gap-2 items-center justify-center"
                  key={stat.label}
                >
                  <div className="text-center flex flex-col h-full pt-5">
                    <AnimatedCounter end={stat.end} suffix="+" />
                    <div className="text-secondary font-semibold font-poppins text-sm md:text-base">
                      {stat.label}
                    </div>
                  </div>
                  {/* Solo muestra la flecha si no es el último elemento */}
                  {idx !== 3 && (
                    <svg
                      className="text-blackone"
                      width="12"
                      height="142"
                      viewBox="0 0 12 142"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 0.226497L0.226497 6L6 11.7735L11.7735 6L6 0.226497ZM6 141.773L11.7735 136L6 130.226L0.226497 136L6 141.773ZM6 6H5L5 136H6H7L7 6H6Z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* Gallery Section */
        <section className="px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12 text-center font-segoe">
              Nuestros Proyectos
            </h2>

            <div
              ref={galleryRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 px-4"
            >
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border border-border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-foreground text-lg font-segoe">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm font-poppins">
                        {item.product}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full flex justify-end mt-8">
              <Button variant="black">Mostrar más</Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
