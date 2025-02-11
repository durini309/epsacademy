
const StrugglesSection = () => {
  return (
    <section className="py-20 px-4 bg-secondary/20 relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-6">
            ¿Por qué no encuentro un trabajo remoto si soy buen programador?
          </h2>
          <div className="space-y-6">
            <p className="text-muted-foreground">
            Los programadores enfrentan un desafío único en la búsqueda de trabajo remoto, y no es por falta de conocimientos técnicos. La mayoría se enfoca exclusivamente en mejorar sus habilidades de programación, olvidando que el trabajo remoto requiere mucho más que solo escribir buen código
            </p>
            <p className="text-muted-foreground">
            Sin una marca personal sólida y sin las soft skills necesarias para el trabajo remoto, incluso los programadores más talentosos pueden pasar meses aplicando sin resultados.
            </p>
          </div>
        </div>
        <div className="relative">
          <img
            src="/me2.webp"
            alt="Remote work challenges"
            className="rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default StrugglesSection;
