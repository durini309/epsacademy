
const StrugglesSection = () => {
  return (
    <section className="py-20 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-6">
            Why Most Developers Struggle with Remote Job Search
          </h2>
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Today's remote job market is more saturated than ever. While most developers focus solely on
              technical skills, they're missing the crucial soft skills that make remote workers successful.
            </p>
            <p className="text-muted-foreground">
              That's where we come in - helping you develop the complete package that companies are actually
              looking for.
            </p>
          </div>
        </div>
        <div className="relative">
          <img
            src="/placeholder.svg"
            alt="Remote work challenges"
            className="rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default StrugglesSection;
