"use client";

import { useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { ProductMarkdown } from "@/lib/products";
import { ItemProductInformation } from "./ItemProductInformation";
import ItemProduct from "./ItemProduct";
import gsap from "gsap";

interface Props {
  products: ProductMarkdown[];
}

export default function Products({ products }: Props) {
  const autoplay = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const wheel = useRef(WheelGesturesPlugin({ forceWheelAxis: "y" }));

  const [productselected, setproductselected] =
    useState<ProductMarkdown | null>(null);

  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!productselected && products.length > 0) {
      setproductselected(products[0]);
    }
  }, [products, productselected]);

  // Animación al cambiar de producto
  useEffect(() => {
    if (infoRef.current) {
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [productselected]);

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
          {products.map((product, index) => (
            <CarouselItem
              key={index}
              className="w-fit md:w-full h-full basis-auto md:basis-1/6"
            >
              <ItemProduct
                onClick={setproductselected}
                product={product}
                productSelected={productselected?.slug === product.slug}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Contenedor con altura mínima para que el layout no salte */}
      <div className="min-h-[720px] mt-6">
        {productselected && (
          <div ref={infoRef}>
            <ItemProductInformation product={productselected.frontmatter} />
          </div>
        )}
      </div>
    </div>
  );
}
