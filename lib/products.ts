import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Product } from "./product.interface";

const CONTENT_DIR = path.join(process.cwd(), "content", "products");

export interface ProductMarkdown {
  slug: string;
  frontmatter: Product;
  content: string;
}

export async function getProducts(): Promise<ProductMarkdown[]> {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const Products = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
    const { data, content } = matter(raw);

    return {
      slug,
      frontmatter: data as Product, // 👈 Aquí se castea a tu interfaz
      content,
    };
  });

  return Products;
}

export async function getPreviousProductInList(
  currentSlug: string
): Promise<ProductMarkdown | null> {
  const Products = await getProducts();
  const currentIndex = Products.findIndex((p) => p.slug === currentSlug);
  const previousProduct = Products[currentIndex - 1] || null;
  return previousProduct;
}

export async function getNextProductInList(
  currentSlug: string
): Promise<ProductMarkdown | null> {
  const Products = await getProducts();
  const currentIndex = Products.findIndex((p) => p.slug === currentSlug);
  const nextProduct = Products[currentIndex + 1] || null;
  return nextProduct;
}
