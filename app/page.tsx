"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/home/header";
import Hero from "@/components/home/Hero";
import Tabs from "@/components/home/Tabs";
import Footer from "@/components/home/footer";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Component() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Navigation Tabs */}
      <Tabs />

      {/* Footer */}
      <Footer />
    </div>
  );
}
