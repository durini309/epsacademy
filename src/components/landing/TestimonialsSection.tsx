
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle } from "lucide-react";

const testimonials = [
  {
    name: "Roberto Figueroa",
    country: "Fullstack Dev - GT",
    comment: "Los resultados que obtuve fue un incremento salarial del 50% y tener las guías para seguir creciendo además de estar en una comunidad con objetivos en común. Recomiendo el framework pues es una herramienta que te guía a ser mejor, a ser superior.",
    avatar: "/testimonials/roberto.png",
  },
  {
    name: "Daniel Medina",
    country: "Android Engineer - MX",
    comment: "Creo que una de las cosas más importantes de la comunidad es que te amplia la mente y la visibilidad en cuánto a lo que realmente buscan las empresas de los programadores, muchas cosas que varios de nosotros no sabíamos, te da un camino muy claro de lo que tienes que hacer para convertirte en un muy buen profesional.",
    avatar: "/testimonials/daniel.png",
  },
  {
    name: "Diego Ruiz",
    country: "Senior FullStack Dev - GT",
    comment: "Es la primera vez que tengo una entrevista con una empresa internacional, ya que antes no me tomaban en cuenta para las entrevistas, y me ha ido bastante bien ya que me acaba de llegar un correo de que pase las dos primeras fases ya solo falta la ultima entrevista.",
    avatar: "/testimonials/diego.png",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-mono text-center mb-12">
          Mira lo que los miembros opinan:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-muted bg-card/50 backdrop-blur">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.country}</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.comment}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
