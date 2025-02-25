import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TopBar } from "@/components/layout/TopBar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ChevronRight, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { LoadingScreen } from "@/components/ui/loading";

const ModulePage = () => {
  const { courseId, moduleId } = useParams();

  const { data: moduleData, isLoading, error } = useQuery({
    queryKey: ['module', moduleId],
    queryFn: async () => {
      const { data: module, error: moduleError } = await supabase
        .from('module')
        .select('*')
        .eq('id', parseInt(moduleId || '0'))
        .maybeSingle();

      if (moduleError) throw moduleError;
      if (!module) throw new Error('Module not found');

      const { data: lessons, error: lessonsError } = await supabase
        .from('lesson')
        .select('*')
        .eq('module_id', parseInt(moduleId || '0'))
        .order('order');

      if (lessonsError) throw lessonsError;

      return {
        module,
        lessons: lessons || []
      };
    },
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error || !moduleData?.module) {
    return (
      <div>
        <TopBar />
        <div className="pt-8">
          <Breadcrumbs />
        </div>
        <div className="max-w-4xl mx-auto p-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">
                No se pudo cargar el módulo. Por favor, intente nuevamente.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const { module, lessons } = moduleData;

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <TopBar />
      <div className="pt-8">
        <Breadcrumbs />
      </div>
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{module.name}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {lessons.length} {lessons.length === 1 ? 'lección' : 'lecciones'}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {lessons.map((lesson) => (
              <Link
                key={lesson.id}
                to={`/course/${courseId}/module/${moduleId}/lesson/${lesson.id}`}
                className="block hover:bg-secondary/5 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-4 p-4">
                  <div className="w-40 h-24 bg-secondary rounded overflow-hidden shrink-0">
                    <img 
                      src={lesson.thumbnail_url} 
                      alt={lesson.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="group-hover:underline font-medium truncate">
                        {lesson.name}
                      </span>
                      <span className="text-muted-foreground group-hover:underline whitespace-nowrap">
                        - <Clock className="inline-block h-4 w-4 mb-0.5" /> {formatDuration(lesson.length_sec)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {lesson.description}
                    </p>
                  </div>
                  <Button variant="outline" className="shrink-0 group-hover:bg-primary group-hover:text-primary-foreground">
                    Ver lección
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModulePage;