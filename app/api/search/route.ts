// app/api/search/route.ts
import { NextResponse } from "next/server";
import Fuse, { IFuseOptions } from "fuse.js";
import { getProducts } from "@/lib/products";
import { getProjects } from "@/lib/projects";

type Item = {
  slug: string;
  frontmatter: { title?: string; name?: string; tags?: string[] };
};

const normalize = (s?: string) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();
  if (!q) return NextResponse.json({ ok: false }, { status: 400 });

  const [products, services] = await Promise.all([
    getProducts(),
    getProjects(),
  ]);

  const mapForFuse = (arr: any[]): Item[] =>
    arr.map((x) => ({
      slug: x.slug,
      frontmatter: {
        title: x.frontmatter?.title ?? x.frontmatter?.name,
        name: x.frontmatter?.name ?? x.frontmatter?.title,
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

  const qn = normalize(q);

  const productFuse = new Fuse(mapForFuse(products), fuseOptions);
  const serviceFuse = new Fuse(mapForFuse(services), fuseOptions);

  const bestProduct = productFuse.search(qn)[0];
  const bestService = serviceFuse.search(qn)[0];

  const candidates = [
    bestProduct && { ...bestProduct, type: "product" as const },
    bestService && { ...bestService, type: "service" as const },
  ].filter(Boolean) as Array<{
    score?: number;
    item: Item;
    type: "product" | "service";
  }>;

  if (!candidates.length) return NextResponse.json({ ok: false });

  candidates.sort((a, b) => (a.score ?? 1) - (b.score ?? 1));
  const best = candidates[0];

  if (best.score !== undefined && best.score <= 0.4) {
    return NextResponse.json({
      ok: true,
      type: best.type,
      slug: best.item.slug,
    });
  }

  return NextResponse.json({ ok: false });
}
