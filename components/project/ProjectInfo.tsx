export function ProjectInfo({
  client,
  problem,
  solution,
  sector,
}: {
  client: string;
  problem: string;
  solution: string;
  sector: string;
}) {
  return (
    <section className="grid md:grid-cols-2 gap-8 mt-10">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">TODO SOBRE ESTE PROYECTO</h2>
        <div>
          <b>Cliente:</b>
          <p>{client}</p>
        </div>
        <div>
          <b>Problema detectado:</b>
          <p>{problem}</p>
        </div>
        <div>
          <b>Solución desarrollada:</b>
          <p>{solution}</p>
        </div>
        <div>
          <b>Sector:</b>
          <p>{sector}</p>
        </div>
      </div>
    </section>
  );
}
