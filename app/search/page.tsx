import { getProducts } from "@/lib/products";
import { getProjects } from "@/lib/projects";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import { Services } from "@/components/services/Services";
import Projects from "@/components/project/Projects";
import Products from "@/components/products/Productos";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function SearchPage({ searchParams }: any) {
  const q = typeof searchParams?.query === "string" ? searchParams.query : "";

  const [products, projects] = await Promise.all([
    getProducts(),
    getProjects(),
  ]);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header />

      <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">
        <p className="text-sm text-muted-foreground">
          No se encontraron resultados para la búsqueda:{" "}
          <span className="font-semibold">{q}</span>
        </p>

        <Products products={products} />
        <Services />
        <Projects projects={projects} />
      </div>

      <Footer />
    </div>
  );
}
