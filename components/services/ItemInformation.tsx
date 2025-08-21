import { Service } from "@/lib/service.interface";

export const ItemInformation = ({
  service,
  index,
}: {
  service: Service;
  index: number;
}) => {
  const { image, title, description, benefits } = service;

  return (
    <div className="relative h-full overflow-hidden bg-black text-white p-4 py-8 md:p-8 rounded-4xl flex flex-col">
      <img
        src={image}
        alt="service"
        className="absolute hidden md:block right-0 top-0 w-1/3 h-full object-cover object-center rounded-4xl opacity-40 z-0 pointer-events-none select-none"
      />

      <div className="flex gap-2 items-center z-10">
        <div className="w-1 h-3 md:h-6 bg-secondary rounded-xl" />
        <h1 className="text-xl md:text-5xl font-semibold">0{index + 1}.</h1>
      </div>

      <h1 className="text-2xl md:text-6xl font-semibold z-10">{title}</h1>

      <p className="w-full md:w-2/3 z-10 mt-2 md:mt-4 text-sm md:text-normal">
        {description}
      </p>

      <div className="w-full md:w-2/3 z-10 mt-4 px-0 md:px-8 flex-1 overflow-auto">
        <div className="flex gap-2 items-center">
          <div className="w-1 h-3 bg-secondary rounded-xl" />
          <h2 className="text-lg font-semibold">Beneficios</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 mt-2">
          {benefits.map((benefit, index) => (
            <div key={index} className="p-2 md:p-4 rounded-lg bg-background">
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
    </div>
  );
};
