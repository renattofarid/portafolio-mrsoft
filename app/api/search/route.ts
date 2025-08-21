// app/api/search/route.ts
import { NextResponse } from "next/server";
import Fuse from "fuse.js";
import type { IFuseOptions } from "fuse.js";
import { getProducts } from "@/lib/products";
import { getProjects } from "@/lib/projects";
import { services as staticServices } from "@/lib/services"; // 👈 importa tu array

type Item = {
  slug: string;
  frontmatter: { title?: string; name?: string; tags?: string[] };
};

const normalize = (s?: string) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

// 🔑 alias de búsqueda
const PRODUCT_KEYWORDS = ["productos", "producto", "product", "products"];
const SERVICE_KEYWORDS = ["servicios", "servicio", "service", "services"];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();
  if (!q) return NextResponse.json({ ok: false }, { status: 400 });

  const qn = normalize(q);

  // Aliases directos
  if (PRODUCT_KEYWORDS.includes(qn)) {
    return NextResponse.json({
      ok: true,
      type: "redirect",
      slug: "/productos",
    });
  }

  if (SERVICE_KEYWORDS.includes(qn)) {
    return NextResponse.json({
      ok: true,
      type: "redirect",
      slug: "/servicios",
    });
  }

  const [products, projects] = await Promise.all([
    getProducts(),
    getProjects(),
  ]);

  // normalizar arrays para Fuse
  const mapForFuse = (arr: any[]): Item[] =>
    arr.map((x) => ({
      slug: x.slug,
      frontmatter: {
        title: x.frontmatter?.title ?? x.title ?? x.name,
        name: x.frontmatter?.name ?? x.name ?? x.title,
        tags: x.frontmatter?.tags ?? [],
      },
    }));

  const fuseOptions: IFuseOptions<Item> = {
    includeScore: true,
    threshold: 0.4,
    keys: [
      {
        name: "frontmatter.title",
        getFn: (obj) => normalize(obj.frontmatter?.title),
        weight: 0.7,
      },
      {
        name: "frontmatter.name",
        getFn: (obj) => normalize(obj.frontmatter?.name),
        weight: 0.2,
      },
      {
        name: "slug",
        getFn: (obj) => normalize(obj.slug),
        weight: 0.1,
      },
      {
        name: "frontmatter.tags",
        getFn: (obj) => (obj.frontmatter?.tags || []).map(normalize),
        weight: 0.2,
      },
    ],
  };

  const qnFuse = normalize(q);

  // Inicializar Fuse con tus colecciones
  const productFuse = new Fuse(mapForFuse(products), fuseOptions);
  const projectFuse = new Fuse(mapForFuse(projects), fuseOptions);
  const serviceFuse = new Fuse(
    staticServices.map((s) => ({
      slug: s.slug,
      frontmatter: { title: s.title, name: s.title, tags: [] },
    })),
    fuseOptions
  );

  const bestProduct = productFuse.search(qnFuse)[0];
  const bestProject = projectFuse.search(qnFuse)[0];
  const bestService = serviceFuse.search(qnFuse)[0];

  const candidates = [
    bestProduct && { ...bestProduct, type: "product" as const },
    bestProject && { ...bestProject, type: "project" as const },
    bestService && { ...bestService, type: "service" as const },
  ].filter(Boolean) as Array<{
    score?: number;
    item: Item;
    type: "product" | "project" | "service";
  }>;

  if (!candidates.length) return NextResponse.json({ ok: false });

  candidates.sort((a, b) => (a.score ?? 1) - (b.score ?? 1));
  const best = candidates[0];

  if (best.score !== undefined && best.score <= 0.4) {
    if (best.type === "service") {
      // 👈 redirige al detalle del servicio con ?s={slug}
      return NextResponse.json({
        ok: true,
        type: "redirect",
        slug: `/servicios?s=${best.item.slug}`,
      });
    }

    return NextResponse.json({
      ok: true,
      type: best.type,
      slug: `/${best.item.slug}`,
    });
  }

  return NextResponse.json({ ok: false });
}
