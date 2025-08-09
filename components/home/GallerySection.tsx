import { Button } from "../ui/button";
import GalleryItem from "./GalleryItem";
import { galleryItems } from "./lib/gallery.data";

interface Props {
  ref: React.Ref<HTMLDivElement>;
}

export default function GallerySection({ ref }: Props) {
  return (
    <section className="px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12 text-center font-segoe">
          Nuestros Proyectos
        </h2>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 px-4"
        >
          {galleryItems.map((item) => (
            <GalleryItem key={item.id} item={item} />
          ))}
        </div>

        <div className="w-full flex justify-end mt-8">
          <Button variant="black">Mostrar más</Button>
        </div>
      </div>
    </section>
  );
}
