import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LoadingScreen } from "@/components/ui/loading";
import { TopBar } from "@/components/layout/TopBar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock } from "lucide-react";

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
      <div className="pt-4">
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
                    <a
                      key={lesson.id}
                      href={`/course/${courseId}/module/${moduleId}/lesson/${lesson.id}`}
                      className="block p-4 rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-48 h-28 bg-muted rounded-lg overflow-hidden shrink-0">
                          {lesson.thumbnail_url ? (
                            <img 
                              src={lesson.thumbnail_url} 
                              alt={lesson.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-secondary">
                              <span className="text-secondary-foreground">No thumbnail</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold mb-2">{lesson.name}</h3>
                          <p className="text-muted-foreground text-sm line-clamp-2">{lesson.description}</p>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground shrink-0">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{formatTime(lesson.length_sec)}</span>
                        </div>
                      </div>
                    </a>
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