import { Project } from "@/lib/project.interface";
import { ProjectMarkdown } from "@/lib/projects";
import Image from "next/image";

export default function ItemProject({
  project,
  onClick,
}: {
  project: ProjectMarkdown;
  onClick: (project: ProjectMarkdown) => void;
}) {
  return (
    <button
      className="flex flex-col cursor-pointer relative px-8 py-3 rounded-xl overflow-hidden z-10 w-fit md:w-full text-nowrap"
      onClick={() => onClick(project)}
    >
      <div className="absolute w-full h-full backdrop-blur-lg bg-transparent top-0 left-0"></div>
      <Image
        className="object-cover -z-10"
        fill
        src={project.frontmatter.gallery[0].split(",").shift()!}
        alt={project.frontmatter.title}
      />
      <h2 className="text-white font-medium relative z-0 text-xs md:text-base">
        {project.frontmatter.title}
      </h2>
    </button>
  );
}
