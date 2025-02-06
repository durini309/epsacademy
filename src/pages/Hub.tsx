
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TopBar } from "@/components/layout/TopBar";
import { LoadingScreen } from "@/components/ui/loading";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/lib/auth";

const Hub = () => {
  const { user } = useAuthStore();
  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('course')
        .select('*');
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Hola, {user?.user_metadata?.full_name || 'estudiante'}
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Estos son los cursos que tienes disponible
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.map((course) => (
            <Link key={course.id} to={`/course/${course.id}`}>
              <Card className="h-full hover:bg-secondary/5 transition-colors overflow-hidden">
                <CardHeader className="p-0">
                  <div className="w-full aspect-[4/3] relative">
                    <img
                      src={course.thumbnail_url}
                      alt={course.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <CardTitle className="text-white mb-2">{course.name}</CardTitle>
                      <p className="text-white/80">
                        {course.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {course.total_lectures} lecciones
                    </span>
                    <span className="text-sm font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {course.total_lectures ? 
                        `${Math.round((0 / course.total_lectures) * 100)}% completado` : 
                        '0% completado'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hub;
