
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TopBar } from "@/components/layout/TopBar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Play, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Course, Module, Lesson } from "@/types/database";

const ModulePage = () => {
  const { courseId, moduleId } = useParams();

  const { data: moduleData, isLoading } = useQuery({
    queryKey: ['module', moduleId],
    queryFn: async () => {
      const { data: course, error: courseError } = await supabase
        .from('course')
        .select('*')
        .eq('id', courseId)
        .single();

      if (courseError) throw courseError;

      const { data: module, error: moduleError } = await supabase
        .from('module')
        .select('*')
        .eq('id', moduleId)
        .single();

      if (moduleError) throw moduleError;

      const { data: lessons, error: lessonsError } = await supabase
        .from('lesson')
        .select('*')
        .eq('module_id', moduleId)
        .order('order');

      if (lessonsError) throw lessonsError;

      return {
        course: course as Course,
        module: module as Module,
        lessons: lessons as Lesson[]
      };
    },
  });

  if (isLoading || !moduleData) {
    return <div>Loading...</div>;
  }

  const { course, module, lessons } = moduleData;

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Breadcrumbs />
      
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="flex justify-between items-start gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">{module.name}</h1>
            <p className="text-muted-foreground">
              {lessons.length} lessons
            </p>
          </div>
          <div className="w-48 h-32 bg-muted rounded-lg shrink-0 overflow-hidden">
            <img 
              src={course.thumbnail_url} 
              alt={module.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-4">
          {lessons.map((lesson) => (
            <Card key={lesson.id} className="group hover:bg-muted/50 transition-colors">
              <Link to={`/course/${courseId}/module/${moduleId}/lesson/${lesson.id}`}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-32 h-20 bg-muted rounded flex items-center justify-center shrink-0 overflow-hidden relative">
                    <img 
                      src={lesson.thumbnail_url} 
                      alt={lesson.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
                    <Play className="w-8 h-8 text-white absolute" />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="font-medium">{lesson.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {lesson.description}
                    </div>
                  </div>
                  
                  <div className="shrink-0 w-20 flex justify-end">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {Math.floor(lesson.length_sec / 60)}:{(lesson.length_sec % 60).toString().padStart(2, '0')}
                    </div>
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
