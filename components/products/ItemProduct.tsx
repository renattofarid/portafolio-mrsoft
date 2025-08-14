import { ProductMarkdown } from "@/lib/products";
import Image from "next/image";

export default function ItemProduct({
  productSelected,
  product,
  onClick,
}: {
  productSelected: boolean;
  product: ProductMarkdown;
  onClick: (product: ProductMarkdown) => void;
}) {
  return (
    <button
      className={`flex flex-col cursor-pointer relative px-8 py-3 rounded-xl overflow-hidden z-10 w-fit md:w-full text-nowrap ${
        productSelected ? "ring-4 ring-[#686868]" : ""
      }`}
      // style={
      //   productSelected
      //     ? ({
      //         "--tw-ring-color": product.frontmatter.color,
      //       } as React.CSSProperties)
      //     : undefined
      // }
      onClick={() => onClick(product)}
    >
      <div className="absolute w-full h-full backdrop-blur-xs bg-transparent top-0 left-0"></div>
      <Image
        className="object-cover -z-10"
        fill
        src={product.frontmatter.icon}
        alt={product.frontmatter.title}
      />
      <h2 className="text-white font-medium relative z-0 text-xs md:text-base">
        {product.frontmatter.title}
      </h2>
    </button>
  );
}
