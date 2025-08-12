import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Project } from "./project.interface";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

export interface ProjectMarkdown {
  slug: string;
  frontmatter: Project;
  content: string;
}

export async function getProjects(): Promise<ProjectMarkdown[]> {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const projects = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
    const { data, content } = matter(raw);

    return {
      slug,
      frontmatter: data as Project, // 👈 Aquí se castea a tu interfaz
      content,
    };
  });

  return projects;
}

export async function getPreviousProjectInList(
  currentSlug: string
): Promise<ProjectMarkdown | null> {
  const projects = await getProjects();
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  const previousProject = projects[currentIndex - 1] || null;
  return previousProject;
}

export async function getNextProjectInList(
  currentSlug: string
): Promise<ProjectMarkdown | null> {
  const projects = await getProjects();
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  const nextProject = projects[currentIndex + 1] || null;
  return nextProject;
}
