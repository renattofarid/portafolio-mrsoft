import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function AboutUsSection() {
  const aboutRef = useRef<HTMLElement>(null);
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

  return (
    <section ref={aboutRef} className="px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-6xl border-b-4 font-extrabold text-blackone pb-6 md:mb-8 font-segoe px-4">
          ¿QUIÉNES SOMOS?
        </h2>

        <div className="flex justify-end w-full">
          <p className="w-full text-blackone font-medium text-xs md:text-base leading-tight mb-12 md:mb-16 max-w-4xl text-end font-poppins px-4">
            Mr. Soft es una empresa peruana con más de 20 años de experiencia en
            el desarrollo de software y soluciones tecnológicas a medida. Nos
            hemos propuesto acompañar a empresas de diferentes sectores en su
            transformación digital, brindando herramientas innovadoras que
            potencien sus objetivos y los orienten hacia el éxito. Mr. Soft,
            empresa peruana con más de 20 años de experiencia en el desarrollo
            de software y soluciones tecnológicas a medida.
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
  );
}
