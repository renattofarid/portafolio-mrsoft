import { Product } from "@/lib/product.interface";
import { Button } from "../ui/button";
import Iphone15Pro from "../magicui/iphone-15-pro";

export const ItemProductInformation = ({ product }: { product: Product }) => {
  const { image, title, description, benefits, index, color } = product;
  return (
    <div className="relative mt-10 h-full overflow-hidden bg-black text-white p-4 py-8 md:p-8 rounded-4xl flex flex-col md:min-h-[720px]">
      <div className="flex gap-2 items-center z-10">
        <div
          className="w-1 h-3 md:h-6 rounded-xl"
          style={{
            backgroundColor: color,
          }}
        />
        <h1 className="text-xl md:text-5xl font-semibold">{index}.</h1>
      </div>

      <h1 className="text-2xl md:text-6xl font-semibold z-10">{title}</h1>

      <p className="w-full md:w-2/3 z-10 mt-4 text-sm md:text-normal">
        {description}
      </p>

      <div className="w-full md:w-2/3 z-10 mt-4 px-0 md:px-8 flex-1 overflow-auto">
        <div className="flex gap-2 items-center">
          <div
            className="w-1 h-3  rounded-xl"
            style={{
              backgroundColor: color,
            }}
          />
          <h2 className="text-lg font-semibold">Beneficios</h2>
        </div>

        <div className="grid grid-rows-3 grid-cols1 md:grid-flow-col gap-4 mt-2">
          {benefits.map((benefit, index) => (
            <div key={index} className="p-4 rounded-lg bg-background">
              <h3 className="font-semibold text-black dark:text-white text-sm md:text-base">
                {benefit.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-xs md:text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Iphone15Pro
        src={image}
        className="block md:absolute top-0 right-0 w-2/3 mx-auto md:w-1/3 h-full object-cover object-center rounded-4xl mt-4 md:mt-0 z-0 pointer-events-none select-none py-4"
      />
    </div>
  );
};
