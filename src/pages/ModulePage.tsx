
import { useParams, Link } from "react-router-dom";
import { courses } from "@/lib/modules";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TopBar } from "@/components/layout/TopBar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Check, Play, Clock } from "lucide-react";

const ModulePage = () => {
  const { courseId, moduleId } = useParams();
  const course = courses.find(c => c.id === courseId);
  const module = course?.modules.find(m => m.id === parseInt(moduleId || "0"));

  if (!course || !module) {
    return <div>Module not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Breadcrumbs />
      
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="flex justify-between items-start gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">{module.title}</h1>
            <p className="text-muted-foreground">
              {module.sections.length} lessons
            </p>
          </div>
          <div className="w-48 h-32 bg-muted rounded-lg shrink-0 overflow-hidden">
            <img 
              src={course.imageUrl} 
              alt={module.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-4">
          {module.sections.map((section, index) => (
            <Card key={section.id} className="group hover:bg-muted/50 transition-colors">
              <Link to={`/course/${courseId}/module/${moduleId}/lesson/${section.id}`}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-32 h-20 bg-muted rounded flex items-center justify-center shrink-0 overflow-hidden relative">
                    {section.type === "video" && (
                      <>
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
                        <Play className="w-8 h-8 text-white absolute" />
                      </>
                    )}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="font-medium">{section.title}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {section.description}
                    </div>
                  </div>
                  
                  <div className="shrink-0 w-20 flex justify-end">
                    {section.type === "video" && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        10:53
                      </div>
                    )}
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModulePage;
