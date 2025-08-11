export function Hero({ title, image }: { title: string; image: string }) {
  return (
    <section className="w-full">
      <h1 className="text-4xl font-extrabold mb-6">{title}</h1>
      <img src={image} alt={title} className="w-full h-auto rounded-2xl" />
    </section>
  );
}
