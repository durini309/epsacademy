
import { Globe2, Trophy, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const achievements = [
  {
    icon: Globe2,
    title: "Work From Anywhere",
    description: "Break free from geographical constraints and work with global companies.",
  },
  {
    icon: Trophy,
    title: "Competitive Salary",
    description: "Access international markets and earn what you're truly worth.",
  },
  {
    icon: Users,
    title: "Global Network",
    description: "Connect with like-minded developers from around the world.",
  },
];

const AchievementsSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">What You'll Achieve</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our program is designed to help you achieve your remote work goals through practical skills and real-world strategies.
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
