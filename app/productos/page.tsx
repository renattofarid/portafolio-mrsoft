import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import Products from "@/components/products/Productos";
import { getProducts } from "@/lib/products";
import { Suspense } from "react";

export default async function Page() {
  const products = await getProducts();
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="md:px-24">
          <h1 className="text-4xl font-bold">Nuestros Productos</h1>
          <p className="mt-2 md:w-4/5 text-xs md:text-sm">
            Contamos con experiencia en el desarrollo de software a medida,
            productos de software que actualmente forman parte de nuestras
            plataformas disponibles para uso inmediato.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="relative mt-10 h-fit overflow-hidden bg-black text-white p-4 py-8 md:p-8 rounded-4xl flex flex-col md:min-h-[720px]"></div>
          }
        >
          <Products products={products} />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
