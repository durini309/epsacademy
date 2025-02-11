
import { Card } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <Card className="p-8 md:p-12 border-muted bg-card/50 backdrop-blur">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <img
                src="/me.webp"
                alt="Profile"
                className="rounded-lg border-muted"
                width={400}
                height={400}
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">
                ¿Quién soy yo? y, ¿Por qué te puedo ayudar?
              </h2>
              <h3 className="text-xl text-primary font-bold mb-4">Soy Juan Carlos, un Programador Superior</h3>
              <p className="text-muted-foreground mb-6">
                Como ingeniero en sistemas con más de 9 años de experiencia, he vivido la transformación de trabajo presencial a
                remoto en primera mano. Mis últimos cuatro trabajos han sido remotos para empresas internacionales, y como
                co-fundador de una empresa de software, he estado en ambos lados de la mesa: siendo entrevistado y entrevistando
                a decenas de programadores.
              </p>
              <p className="text-muted-foreground mb-6">
                Esta experiencia me ha permitido entender exactamente qué buscan las empresas remotas y
                por qué muchos excelentes programadores no logran conseguir estas oportunidades.
              </p>
              <div className="grid grid-cols-4 gap-8 text-center"> {/* Removed 'hidden' class */}
                <div>
                  <p className="text-xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">9+</p>
                  <p className="text-zinc-400 text-sm">Años de experiencia</p>
                </div>
                <div>
                  <p className="text-xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">20+</p>
                  <p className="text-zinc-400 text-sm">Clientes</p>
                </div>
                <div>
                  <p className="text-xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">4</p>
                  <p className="text-zinc-400 text-sm">Trabajos remotos</p>
                </div>
                <div>
                  <p className="text-xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">50+</p>
                  <p className="text-zinc-400 text-sm">Entrevistas hechas</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default AboutSection;
