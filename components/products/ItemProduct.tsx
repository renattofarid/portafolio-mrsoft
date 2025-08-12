import { ProductMarkdown } from "@/lib/products";
import Image from "next/image";

export default function ItemProduct({
  Product,
  onClick,
}: {
  Product: ProductMarkdown;
  onClick: (Product: ProductMarkdown) => void;
}) {
  return (
    <button
      className="flex flex-col cursor-pointer relative px-8 py-3 rounded-xl overflow-hidden z-10 w-fit md:w-full text-nowrap"
      onClick={() => onClick(Product)}
    >
      <div className="absolute w-full h-full backdrop-blur-xs bg-transparent top-0 left-0"></div>
      <Image
        className="object-cover -z-10"
        fill
        src={Product.frontmatter.icon}
        alt={Product.frontmatter.title}
      />
      <h2 className="text-white font-medium relative z-0 text-xs md:text-base">
        {Product.frontmatter.title}
      </h2>
    </button>
  );
}
