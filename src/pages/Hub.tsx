
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate } from "react-router-dom";
import { TopBar } from "@/components/layout/TopBar";
import { supabase } from "@/integrations/supabase/client";
import { Course } from "@/types/database";
import { useAuthStore } from "@/lib/auth";

const Hub = () => {
  const user = useAuthStore((state) => state.user);
  
  const { data: courses, isLoading } = useQuery({
    queryKey: ['enrolled-courses'],
    queryFn: async () => {
      const { data: userCourses, error: userCoursesError } = await supabase
        .from('user_course')
        .select(`
          course:course_id (
            id,
            name,
            description,
            thumbnail_url,
            total_lectures
          )
        `);
      
      if (userCoursesError) throw userCoursesError;
      return userCourses.map(uc => uc.course) as Course[];
    },
    enabled: !!user,
  });

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <TopBar />
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Mis Cursos</h1>
          <p className="text-xl text-foreground">
            Bienvenido, {user.user_metadata.full_name || user.email}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {courses?.map((course) => (
            <Link 
              key={course.id}
              to={`/course/${course.id}`}
              className="group hover:no-underline"
            >
              <div className="course-card group-hover:border-primary transition-colors">
                <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                  <img 
                    src={course.thumbnail_url} 
                    alt={course.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {course.name}
                </h2>
                <p className="text-muted-foreground">{course.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hub;
