import { useQuery } from "@tanstack/react-query";
import { Link, Navigate } from "react-router-dom";
import { TopBar } from "@/components/layout/TopBar";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/lib/auth";
import { LoadingScreen } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const Hub = () => {
  const user = useAuthStore((state) => state.user);
  
  const { data: userData } = useQuery({
    queryKey: ['user-data'],
    queryFn: async () => {
      const { data: userData, error } = await supabase
        .from('user')
        .select('full_name, first_login, id')
        .eq('auth_id', user?.id)
        .single();
      
      if (error) throw error;
      return userData;
    },
    enabled: !!user,
  });

  const { data: coursesData, isLoading } = useQuery({
    queryKey: ['enrolled-courses'],
    queryFn: async () => {
      if (!userData?.id) return null;

      const { data: userCourses, error: userCoursesError } = await supabase
        .from('user_course')
        .select(`
          course:course_id (
            id,
            name,
            description,
            thumbnail_url,
            total_lectures
          ),
          currnent_lesson_id
        `)
        .eq('user_id', userData.id);
      
      if (userCoursesError) throw userCoursesError;

      // Fetch current lesson details for each course
      const coursesWithCurrentLesson = await Promise.all(
        userCourses.map(async (uc) => {
          if (!uc.currnent_lesson_id) return { ...uc };

          const { data: lesson } = await supabase
            .from('lesson')
            .select(`
              *,
              module:module_id (
                id,
                course_id
              )
            `)
            .eq('id', uc.currnent_lesson_id)
            .single();

          return lesson ? {
            ...uc,
            currentLesson: lesson
          } : uc;
        })
      );

      return coursesWithCurrentLesson;
    },
    enabled: !!userData?.id,
  });

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (userData?.first_login) {
    return <Navigate to="/password" replace />;
  }

  if (isLoading || !coursesData) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <TopBar />
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Mis Cursos</h1>
          <p className="text-xl text-foreground">
            Bienvenido, {userData?.full_name || user.email}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {coursesData.map((courseData) => (
            <div key={courseData.course.id} className="space-y-4">
              <Link 
                to={`/course/${courseData.course.id}`}
                className="group hover:no-underline"
              >
                <div className="course-card group-hover:border-primary transition-colors">
                  <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                    <img 
                      src={courseData.course.thumbnail_url} 
                      alt={courseData.course.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {courseData.course.name}
                  </h2>
                  <p className="text-muted-foreground">{courseData.course.description}</p>
                </div>
              </Link>

              {'currentLesson' in courseData && courseData.currentLesson && (
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-16 bg-secondary rounded overflow-hidden shrink-0">
                      {courseData.currentLesson.thumbnail_url && (
                        <img 
                          src={courseData.currentLesson.thumbnail_url} 
                          alt={courseData.currentLesson.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm mb-1 truncate">
                        {courseData.currentLesson.name}
                      </h3>
                      <Button asChild size="sm">
                        <Link 
                          to={`/course/${courseData.currentLesson.module.course_id}/module/${courseData.currentLesson.module.id}/lesson/${courseData.currentLesson.id}`}
                        >
                          Continuar aprendiendo
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hub;