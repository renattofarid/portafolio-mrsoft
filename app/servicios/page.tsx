import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import { Button } from "@/components/ui/button";

export default function ProjectPage() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="px-24">
          <h1 className="text-4xl font-bold">Nuestros Servicios</h1>
          <p className="mt-2 w-4/5 text-sm">
            En Mr. Soft, entendemos que cada negocio es único, por eso ofrecemos
            una gama completa de servicios diseñados para responder a las
            necesidades específicas de tu empresa, ayudándote a alcanzar tus
            objetivos con soluciones tecnológicas personalizadas y efectivas.
          </p>
        </div>

        <div className="bg-black text-white p-8 rounded-4xl relative mt-10">
          <img
            src="/servicios/desarrollo.jpg"
            alt="Desarrollo"
            className="absolute right-0 top-0 w-1/3 h-full object-cover object-left rounded-4xl opacity-40 z-0"
          />
          <div className="flex gap-2 items-center">
            <div className="w-1 h-6 bg-secondary rounded-xl"></div>
            <h1 className="text-5xl font-semibold z-10 relative">01.</h1>
          </div>
          <h1 className="text-6xl font-semibold z-10 relative">
            Desarrollo de softwar a medida
          </h1>
          <p className="w-2/3 z-10 relative mt-4">
            Creamos soluciones de software únicas, diseñadas específicamente
            para las necesidades de tu negocio.
          </p>
          <div className="w-2/3 z-10 relative mt-4 px-8">
            <div className="flex gap-2 items-center">
              <div className="w-1 h-3 bg-secondary rounded-xl"></div>
              <h1 className="text-lg font-semibold z-10 relative">
                Beneficios
              </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Mayor escalabilidad",
                  description:
                    "No necesitas migrar a otro sistema al crecer o diversificar tu operación.",
                },
                {
                  title: "Control total de su sistema",
                  description:
                    "Evita depender de proveedores externos para todo.",
                },
                {
                  title: "Integración con tus sistemas",
                  description: "Facilita la centralización de información.",
                },
                {
                  title: "Toma de decisiones basada en datos",
                  description:
                    "Facilita la analítica y la mejora continua de procesos.",
                },
                {
                  title: "Desarrollo ágil",
                  description:
                    "Permite crear soluciones personalizadas de forma flexible, adaptándose a cambios en tiempo real y entregando mejoras continuas según las necesidades del cliente.",
                },
              ].map((benefit, index) => (
                <div key={index} className="p-4 rounded-lg bg-background">
                  <h3 className="font-semibold text-black">{benefit.title}</h3>
                  <p className="text-gray-700 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
            <Button className="mt-6 px-10 bg-secondary text-white hover:bg-secondary/80">
              Conocer más
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
