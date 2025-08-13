import { technologies } from "@/lib/technologies";

type ProjectInfoProps = {
  client: string;
  problem: string;
  solution: string;
  sector: string;
  technologies: string[]; // Array of technology names
};

const infoItems = [
  { label: "/ Cliente", key: "client" },
  { label: "/ Problema", key: "problem" },
  { label: "/ Solución", key: "solution" },
  { label: "/ Sector", key: "sector" },
];

export function ProjectInfo(props: ProjectInfoProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
      <h2 className="text-3xl md:text-5xl font-bold col-span-2 md:col-auto">
        TODO SOBRE ESTE PROYECTO
      </h2>
      <div className="w-full">
        {infoItems.map(({ label, key }) => (
          <div className="mb-4" key={key}>
            <h3 className="font-bold text-lg md:text-2xl">{label}</h3>
            <p className="text-xs md:text-base">
              {props[key as keyof ProjectInfoProps]}
            </p>
          </div>
        ))}
      </div>
      <div className="col-span-2 space-y-4">
        <div className="flex items-center gap-2">
          <div className="bg-secondary h-3 w-1 rounded-xl"></div>
          <h2 className="text-lg font-semibold">Tecnologías Usadas</h2>
        </div>
        <div className="flex gap-4 md:gap-8 bg-white dark:bg-gray-800 p-4 rounded-lg">
          {props.technologies.map((tech, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center gap-2 p-2 size-20 md:size-28 rounded-lg bg-background dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-blackthree/20 transition-colors"
            >
              <span className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
                {technologies[tech]?.title || tech}
              </span>
              <img
                src={technologies[tech]?.image}
                alt={tech}
                className="size-10 md:size-14"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
