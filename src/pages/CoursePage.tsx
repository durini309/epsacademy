import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TopBar } from "@/components/layout/TopBar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ChevronRight, Clock } from "lucide-react";
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
        {/* Course Overview Card */}
        <Card>
          <div className="p-6 flex gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{course.name}</h1>
              <p className="text-muted-foreground text-lg">{course.description}</p>
            </div>
            <div className="w-64 h-40 shrink-0">
              <img 
                src={course.thumbnail_url} 
                alt={course.name} 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </Card>
        
        {/* Continue Learning Section */}
        {currentLesson && (
          <div className="bg-secondary/10 rounded-lg">
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
          </div>
        )}

        {/* Modules Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Módulos del curso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {modules.map((module) => (
              <div key={module.id} className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold">{module.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {module.total_lessons || 0} lecciones
                    </p>
                  </div>
                  <Button variant="outline" asChild>
                    <Link to={`/course/${courseId}/module/${module.id}`}>
                      Ver módulo
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CoursePage;