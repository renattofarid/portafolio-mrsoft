export function Gallery({ images }: { images: string[] }) {
  return (
    <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-14">
      {images.map((src, i) => (
        <div
          key={i}
          className={i === 0 ? "sm:col-span-2 lg:col-span-2 row-span-1" : ""}
        >
          <img
            src={src.split(",")[0] || ""}
            alt={`img-${i}`}
            className={
              i === 0
                ? "w-full h-80 rounded-xl object-cover object-top-left"
                : "w-full h-80 rounded-xl object-cover object-top-left"
            }
          />
          <div className="mt-2 font-bold text-start text-lg">
            {src.split(",")[1] || `Imagen ${i + 1}`}
          </div>
        </div>
      ))}
    </section>
  );
}
