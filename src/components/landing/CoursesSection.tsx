
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const courses = [
  {
    title: "Framework del Programador Superior",
    description: "Conviertete en un verdadero Programador Superior y vuélvete un programador altamente valioso. Con mi mentoría, te asegurarás de que cada paso que das va en la dirección correcta. ",
    image: "/framework-img.webp",
    badge: "BEST SELLER",
    tags: ["Networking", "Soft-Skills", "Marca personal", "Entrevistas", "Trabajo remoto"],
    link: "/about-framework",
    includes: [
      "Mentoría personalizada",
      "Comunidad privada de programadores",
      "Sesiones en vivo",
      "Actualizaciones gratuitas",
      "Acceso de por vida"
    ]
  },
  {
    title: "Fundamentos del trabajo remoto",
    description: "Este curso es una introducción sobre el trabajo remoto. Aprenderás los fundamentos necesarios para poder encontrar un trabajo como programador remoto por cuenta propia",
    image: "/course-img.webp",
    badge: "NUEVO",
    tags: ["Introducción", "Soft Skills", "Currículum", "Portafolio"],
    link: "/about-fundamentos",
    includes: [
      "Acceso de por vida al contenido",
      "Ejercicios prácticos",
      "Fast track descargable",
      "Template para tu CV"
    ]
  },
];

const CoursesSection = () => {
  return (
    <section id="courses" className="py-20 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-mono text-center mb-12">
          Aprendizajes disponibles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course) => (
            <Card key={course.title} className="border-muted bg-card/50 backdrop-blur overflow-hidden">
              <CardHeader className="relative p-0">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-84 object-cover"
                />
                {course.badge && (
                  <Badge
                    className="absolute top-4 right-4"
                    variant={course.badge === "NUEVO" ? "destructive" : "default"}
                  >
                    {course.badge}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <CardTitle className="font-mono">{course.title}</CardTitle>
                <p className="text-muted-foreground">{course.description}</p>
                
                {/* Included items list */}
                <div className="space-y-2">
                  <p className="font-semibold">Incluye:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    {course.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div>
                  <Link to={course.link}>
                    <Button className="w-full">Ver más</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
