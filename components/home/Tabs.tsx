"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import AboutUsSection from "./AboutUsSection";
import GallerySection from "./GallerySection";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("nosotros");

  const devicesRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

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
        <AboutUsSection />
      ) : (
        /* Gallery Section */
        <GallerySection ref={galleryRef} />
      )}
    </>
  );
}
