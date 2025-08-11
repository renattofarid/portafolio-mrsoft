export function Gallery({ images }: { images: string[] }) {
  return (
    <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`img-${i}`}
          className="w-full h-auto rounded-xl"
        />
      ))}
    </section>
  );
}
