"use client";

import { useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { ProductMarkdown } from "@/lib/products";
import { ItemProductInformation } from "./ItemProductInformation";
import ItemProduct from "./ItemProduct";

interface Props {
  products: ProductMarkdown[];
}

export default function Products({ products }: Props) {
  const autoplay = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const wheel = useRef(WheelGesturesPlugin({ forceWheelAxis: "y" }));

  const [productselected, setproductselected] =
    useState<ProductMarkdown | null>(null);

  useEffect(() => {
    if (!productselected && products.length > 0) {
      setproductselected(products[0]);
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

      {productselected && (
        <ItemProductInformation product={productselected.frontmatter} />
      )}
    </div>
  );
}
