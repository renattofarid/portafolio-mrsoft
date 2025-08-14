"use client";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FacebookIcon } from "../icons/FacebookIcon";
import { InstagramIcon } from "../icons/InstagramIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TiktokIcon } from "../icons/TIktokIcon";

export default function Footer() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".marquee-text", {
        x: "-100%",
        ease: "linear",
        duration: 100,
        repeat: -1,
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  // const text = "DISEÑO DE PORTALES WEB ❄️ OPTIMIZACIÓN DE PROCESOS DE NEGOCIO";

  const textLeft = "DISEÑO DE PORTALES WEB";
  const textRight = "OPTIMIZACIÓN DE PROCESOS DE NEGOCIO";

  return (
    <footer className="bg-[#EAEAEA] dark:bg-[#2d2d2d] py-6 mt-16 transition-colors duration-300">
      <div className="">
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-8 mb-6 md:mb-8 px-4 max-w-7xl mx-auto">
          <div className="font-black tracking-wide flex flex-col text-3xl text-foreground">
            <p> PORTFOLIO </p>
            <p className="-mt-2">
              MR<span className="text-secondary">.</span>SOFT{" "}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-10">
            <div>
              <h3 className="font-semibold text-foreground mb-4 font-segoe">
                Nuestras redes sociales
              </h3>
              <div className="flex space-x-4">
                <Link
                  href="https://www.facebook.com/Garzasoft/?locale=es_LA"
                  target="_blank"
                >
                  <FacebookIcon className="cursor-pointer text-blackone" />
                </Link>

                <Link
                  href="https://www.instagram.com/mr.soft.oficial/"
                  target="_blank"
                >
                  <InstagramIcon className="cursor-pointer text-blackone" />
                </Link>

                <Link
                  href="https://www.youtube.com/channel/UCwrskfzuwaItnpTxamzL3MQ"
                  target="_blank"
                >
                  <YoutubeIcon className="cursor-pointer text-blackone" />
                </Link>

                <Link
                  href="https://www.tiktok.com/@mr.soft.oficial"
                  target="_blank"
                >
                  <TiktokIcon className="cursor-pointer text-blackone" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4 font-segoe">
                Contacto
              </h3>
              <a
                href="mailto:martin.ampuero@garzasoft.com"
                className="text-blackone transition-colors cursor-pointer font-poppins"
              >
                martin.ampuero@garzasoft.com
              </a>
            </div>
          </div>
        </div>

        <div className="py-8 overflow-hidden">
          <div ref={marqueeRef} className="relative w-full py-4">
            <div className="flex w-max whitespace-nowrap marquee-text text-foreground text-lg md:text-5xl font-bold">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center px-8">
                  <span>{textLeft}</span>
                  <img
                    src="/Star.png"
                    alt="*"
                    className="mx-6 h-5 w-5 md:h-8 md:w-8 object-contain"
                  />
                  <span>{textRight}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center text-blacktwo mt-4 font-poppins">
            Mr. Soft ©{new Date().getFullYear()} - All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
