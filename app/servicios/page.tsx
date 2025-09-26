import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import Projects from "@/components/project/Projects";
import { Services } from "@/components/services/Services";
import { getProjects } from "@/lib/projects";
import { Suspense } from "react";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ searchParams }: PageProps) {
  const service = searchParams.s as string;

  // Mapear slug de servicio a categoría de proyecto
  const categoryMap: { [key: string]: string } = {
    'desarrollo': 'desarrollo',
    'paginas': 'paginas',
    'ecommerce': 'ecommerce'
  };

  const category = service && categoryMap[service] ? categoryMap[service] : undefined;
  const projects = await getProjects(category);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="md:px-24">
          <h1 className="text-4xl font-bold">Nuestros Servicios</h1>
          <p className="mt-2 md:w-4/5 text-xs md:text-sm">
            En Mr. Soft, entendemos que cada negocio es único, por eso ofrecemos
            una gama completa de servicios diseñados para responder a las
            necesidades específicas de tu empresa, ayudándote a alcanzar tus
            objetivos con soluciones tecnológicas personalizadas y efectivas.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="relative mt-10 h-fit overflow-hidden bg-black text-white p-4 py-8 md:p-8 rounded-4xl flex flex-col md:min-h-[720px]"></div>
          }
        >
          <Services />
        </Suspense>

        <Projects projects={projects} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
