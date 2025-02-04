
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { TopBar } from "@/components/layout/TopBar";
import { supabase } from "@/integrations/supabase/client";
import { Course } from "@/types/database";

const Index = () => {
  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('course')
        .select('*');
      
      if (error) throw error;
      return data as Course[];
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TopBar />
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-primary">Plataforma de Aprendizaje</h1>
        
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
}

export default Index;
