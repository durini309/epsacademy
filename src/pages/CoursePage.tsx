
import { useParams, Link } from "react-router-dom";
import { courses } from "@/lib/modules";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

const CoursePage = () => {
  const { courseId } = useParams();
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return <div>Curso no encontrado</div>;
  }

  // Get first section of first module for continue learning
  const firstModule = course.modules[0];
  const firstSection = firstModule?.sections[0];
  const continueLink = firstSection 
    ? `/module/${firstModule.id}/section/${firstSection.id}`
    : "#";

  return (
    <div>
      <TopBar />
      <Breadcrumbs />
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{course.title}</CardTitle>
            <CardDescription className="text-lg">{course.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video mb-6">
              <img 
                src={course.imageUrl} 
                alt={course.title} 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            
            {/* Continue Learning Section */}
            <Card className="mb-6 bg-muted">
              <div className="flex items-center gap-4 p-4">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Continue learning: Module 1, Lesson 1</p>
                  <h3 className="font-semibold">¿Qué es un Programador Superior?</h3>
                  <Progress value={33} className="mt-2" />
                </div>
                <Button as={Link} to={continueLink}>
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>

            {/* Modules List */}
            <div className="space-y-4">
              {course.modules.map((module) => (
                <Card key={module.id}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-xl">
                          {module.title}
                        </CardTitle>
                        <CardDescription>
                          {module.sections.length} lecciones
                        </CardDescription>
                      </div>
                      <Button 
                        variant="outline"
                        as={Link}
                        to={`/module/${module.id}/section/${module.sections[0].id}`}
                      >
                        Ver módulo
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CoursePage;
