import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LoadingScreen } from "@/components/ui/loading";

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
            name
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

  return (
    <div>
      <h1>{moduleData?.course?.name} - {moduleData?.name}</h1>
      <div className="grid gap-4">
        {lessons?.map((lesson) => (
          <div key={lesson.id} className="p-4 border rounded">
            <h2>{lesson.name}</h2>
            <p>{lesson.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModulePage;