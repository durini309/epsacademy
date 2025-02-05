import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LoadingScreen } from "@/components/ui/loading";
import { TopBar } from "@/components/layout/TopBar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Play } from "lucide-react";

const ModulePage = () => {
  const { courseId, moduleId } = useParams();

  const { data: moduleData, isLoading: isModuleLoading } = useQuery({
    queryKey: ['module', moduleId],
    queryFn: async () => {
      const { data: module, error } = await supabase
        .from('module')
        .select(`
          *,
          course:course_id (
            name,
            thumbnail_url
          )
        `)
        .eq('id', parseInt(moduleId!))
        .single();
      
      if (error) throw error;
      return module;
    },
    enabled: !!moduleId,
  });

  const { data: lessons, isLoading: isLessonsLoading } = useQuery({
    queryKey: ['module-lessons', moduleId],
    queryFn: async () => {
      const { data: lessons, error } = await supabase
        .from('lesson')
        .select('*')
        .eq('module_id', parseInt(moduleId!))
        .order('order', { ascending: true });
      
      if (error) throw error;
      return lessons;
    },
    enabled: !!moduleId,
  });

  if (isModuleLoading || isLessonsLoading) {
    return <LoadingScreen />;
  }

  if (!moduleData || !lessons) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <div className="pt-8">
        <Breadcrumbs />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-start gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center gap-8 mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">{moduleData.name}</h1>
              </div>
              {moduleData.course.thumbnail_url && (
                <img 
                  src={moduleData.course.thumbnail_url} 
                  alt={moduleData.course.name}
                  className="w-32 h-32 rounded-lg object-cover"
                />
              )}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Lecciones del módulo</CardTitle>
                <CardDescription>{lessons.length} lecciones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      to={`/course/${courseId}/module/${moduleId}/lesson/${lesson.id}`}
                      className="block p-4 rounded-lg hover:bg-secondary/50 transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-medium group-hover:underline">
                            {lesson.name}
                            <span className="text-muted-foreground ml-2 inline-flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {formatTime(lesson.length_sec)}
                            </span>
                          </h3>
                        </div>
                        <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
                          Ver lección
                          <Play className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModulePage;