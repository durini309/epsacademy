
import { Globe2, Trophy, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const achievements = [
  {
    icon: Globe2,
    title: "Trabaja desde donde sea",
    description: "Ahorrate +400 horas de tráfico y librate de los límites geográficos.",
  },
  {
    icon: Trophy,
    title: "Salario competitivo",
    description: "Accede al mercado internacional y gana lo que en verdad mereces.",
  },
  {
    icon: Users,
    title: "Red de programadores global",
    description: "Conecta con developers de toda LATAM que pienan como vos.",
  },
];

const AchievementsSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">¿Qué vas a lograr?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mi programa está diseñado para ayudarte a lograr tus objetivos de trabajo remoto a través de habilidades prácticas y estrategias reales.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="border-muted bg-card/50 backdrop-blur">
                <CardHeader>
                  <Icon className="w-12 h-12 text-primary mb-4" />
                  <CardTitle className="font-mono">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
