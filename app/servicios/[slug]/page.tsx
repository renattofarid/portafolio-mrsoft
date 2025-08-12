import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
// import { MDXRemote } from "next-mdx-remote/rsc";
import { Hero } from "@/components/project/Hero";
import { ProjectInfo } from "@/components/project/ProjectInfo";
import { Gallery } from "@/components/project/Gallery";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import { getNextProjectInList, getPreviousProjectInList } from "@/lib/projects";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

export async function generateStaticParams() {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const file = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter, content } = matter(file);

  const nextProject = await getNextProjectInList(slug);
  const previousProject = await getPreviousProjectInList(slug);

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-10">
        <Hero
          title={frontmatter.title}
          description={frontmatter.description}
          images={frontmatter.gallery}
        />
        <ProjectInfo
          client={frontmatter.client}
          problem={frontmatter.problem}
          solution={frontmatter.solution}
          sector={frontmatter.sector}
          technologies={frontmatter.technologies || []}
        />
        <Gallery images={frontmatter.gallery} />
        {/* 
        <article className="prose max-w-none mt-12">
          <MDXRemote source={content} />
        </article> */}
        <div className="flex justify-between mt-4">
          {previousProject ? (
            <Link href={`/servicios/${previousProject?.slug}`}>
              <Button variant="black" className="mt-4">
                <ChevronLeft />
                Proyecto Anterior
              </Button>
            </Link>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Link href={`/servicios/${nextProject?.slug}`}>
              <Button variant="black" className="mt-4">
                Siguiente Proyecto
                <ChevronRight />
              </Button>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
