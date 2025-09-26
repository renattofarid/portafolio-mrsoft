import { Project } from "@/lib/project.interface";
import { ProjectMarkdown } from "@/lib/projects";
import Image from "next/image";
import { useState } from "react";

export default function ItemProject({
  projectSelected,
  project,
  onClick,
}: {
  projectSelected: boolean;
  project: ProjectMarkdown;
  onClick: (project: ProjectMarkdown) => void;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative group">
      <button
        className={`flex flex-col cursor-pointer relative px-8 py-3 rounded-xl overflow-hidden z-10 w-fit md:w-full ${
          projectSelected ? "ring-4" : ""
        }`}
        style={
          projectSelected
            ? ({
                "--tw-ring-color": project.frontmatter.color,
              } as React.CSSProperties)
            : undefined
        }
        onClick={() => onClick(project)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
      <div className="absolute w-full h-full backdrop-blur-sm bg-black/30 top-0 left-0"></div>
      <Image
        className="object-cover -z-10"
        fill
        src={project.frontmatter.gallery[0].split(",").shift()!}
        alt={project.frontmatter.title}
      />
        <h2 className="text-white font-medium relative z-0 text-xs md:text-base drop-shadow-lg [text-shadow:_0_2px_8px_rgb(0_0_0_/_80%)] truncate max-w-full">
          {project.frontmatter.title}
        </h2>
      </button>

      {/* Tooltip */}
      {showTooltip && project.frontmatter.title.length > 10 && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-50 whitespace-nowrap max-w-xs">
          <div className="break-words text-center">
            {project.frontmatter.title}
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
}
