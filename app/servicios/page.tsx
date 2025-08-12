import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import Projects from "@/components/project/Projects";
import { Services } from "@/components/services/Services";
import { getProjects } from "@/lib/projects";

export default async function Page() {
  const projects = await getProjects();
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

        <Services />

        <Projects projects={projects} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
