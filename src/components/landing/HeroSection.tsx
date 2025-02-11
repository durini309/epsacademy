
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToCourses = () => {
    const coursesSection = document.getElementById('courses');
    coursesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen relative flex flex-col items-center justify-center text-center">
      {/* Gradient Background */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-green-950/30 to-black" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at center, #00FF00 0.1px, transparent 0.5px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute inset-0 overflow-hidden">
          <div className="animate-blob absolute h-96 w-96 rounded-full bg-green-500/20 blur-3xl top-1/4 -left-48" />
          <div className="animate-blob animation-delay-2000 absolute h-96 w-96 rounded-full bg-green-500/20 blur-3xl top-3/4 -right-48" />
          <div className="animate-blob animation-delay-4000 absolute h-96 w-96 rounded-full bg-green-500/20 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="relative z-10 p-8 rounded-lg max-w-7xl mx-auto space-y-8">
        <div className="inline-block">
          <span className="px-4 py-1.5 rounded-full text-sm border border-[#00FF38]/30 text-[#00FF38] bg-[#00FF38]/10">
            Deja de sufrir, empieza a destacar
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
          <span className="text-white">Domina el arte</span><br />
          <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 text-transparent bg-clip-text">del trabajo remoto</span>
        </h1>

        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
          Únete a programadores que han transformado sus carreras usando <br />
          mi sistema probado para conseguir posiciones remotas bien pagadas
        </p>

        <div className="flex items-center justify-center">
          <Button 
            size="lg" 
            className="bg-[#00FF38] text-black hover:bg-[#00FF38]/90 px-8 text-lg font-medium"
            onClick={scrollToCourses}
          >
            Ver cursos
          </Button>
        </div>

        <div className="space-y-12">
          <div className="text-center">
            <p className="text-zinc-400 text-sm mb-8">Confiando por developers de paises cómo</p>
            <div className="grid grid-cols-4 gap-8 items-center justify-center">
              {/* Add company logos here */}
              <div className="h-8 md:h-16 flex items-center justify-center opacity-50">
                <img src="/flags/flag-gt.png" alt="Guatemala Flag" className="h-8 md:h-16" />
              </div>
              <div className="h-8 md:h-16 flex items-center justify-center opacity-50">
                <img src="/flags/flag-mx.png" alt="Mexico Flag" className="h-8 md:h-16" />
              </div>
              <div className="h-8 md:h-16 flex items-center justify-center opacity-50">
                <img src="/flags/flag-co.png" alt="Colombia Flag" className="h-8 md:h-16" />
              </div>
              <div className="h-8 md:h-16 flex items-center justify-center opacity-50">
                <img src="/flags/flag-ve.png" alt="Venezuela Flag" className="h-8 md:h-16" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
