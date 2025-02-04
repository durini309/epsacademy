import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TopBar } from "@/components/layout/TopBar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Course, Module } from "@/types/database";
import { LoadingScreen } from "@/components/ui/loading";

const CoursePage = () => {
  const { courseId } = useParams();

  const { data: courseData, isLoading } = useQuery({
    queryKey: ['course', courseId],
    queryFn: async () => {
      const { data: course, error: courseError } = await supabase
        .from('course')
        .select('*')
        .eq('id', parseInt(courseId || '0'))
        .single();

      if (courseError) throw courseError;

      const { data: modules, error: modulesError } = await supabase
        .from('module')
        .select('*')
        .eq('course_id', parseInt(courseId || '0'))
        .order('id');

      if (modulesError) throw modulesError;

      const { data: userProgress, error: progressError } = await supabase
        .from('user_course')
        .select('currnent_lesson_id')
        .eq('course_id', parseInt(courseId || '0'))
        .maybeSingle();

      if (progressError) throw progressError;

      let currentLesson = null;
      if (userProgress?.currnent_lesson_id) {
        const { data: lesson } = await supabase
          .from('lesson')
          .select(`
            *,
            module:module_id (
              id,
              name
            )
          `)
          .eq('id', userProgress.currnent_lesson_id)
          .single();
        
        currentLesson = lesson;
      }

      return {
        course: course as Course,
        modules: modules as Module[],
        currentLesson
      };
    },
  });

  if (isLoading || !courseData) {
    return <LoadingScreen />;
  }

  const { course, modules, currentLesson } = courseData;

  return (
    <div>
      <TopBar />
      <Breadcrumbs />
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{course.name}</CardTitle>
            <CardDescription className="text-lg">{course.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video mb-6">
              <img 
                src={course.thumbnail_url} 
                alt={course.name} 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            
            {/* Continue Learning Section */}
            {currentLesson && (
              <Card className="mb-6 bg-secondary/30">
                <div className="flex items-center gap-4 p-4">
                  <div className="w-24 h-16 bg-secondary rounded overflow-hidden shrink-0">
                    <img 
                      src={currentLesson.thumbnail_url} 
                      alt={currentLesson.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Continuar aprendiendo</p>
                    <h3 className="font-semibold">{currentLesson.name}</h3>
                  </div>
                  <Button asChild>
                    <Link to={`/course/${courseId}/module/${currentLesson.module.id}/lesson/${currentLesson.id}`}>
                      Continuar
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            )}

            {/* Modules Title */}
            <h2 className="text-2xl font-bold mb-4">Módulos del curso</h2>

            {/* Modules List */}
            <div className="space-y-4">
              {modules.map((module) => (
                <Card key={module.id}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-xl">
                          {module.name}
                        </CardTitle>
                      </div>
                      <Button variant="outline" asChild>
                        <Link to={`/course/${courseId}/module/${module.id}`}>
                          Ver módulo
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
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