
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { VideoPlayer } from "@/components/section/VideoPlayer";
import { ResourcesList } from "@/components/section/ResourcesList";
import { NavigationPanel } from "@/components/section/NavigationPanel";
import { NavigationButtons } from "@/components/section/NavigationButtons";
import { TopBar } from "@/components/layout/TopBar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { supabase } from "@/integrations/supabase/client";
import { Module, Lesson } from "@/types/database";

export default function SectionPage() {
  const { moduleId, sectionId } = useParams();
  
  const { data: sectionData, isLoading } = useQuery({
    queryKey: ['lesson', moduleId, sectionId],
    queryFn: async () => {
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

      const currentLessonIndex = lessons.findIndex(l => l.id.toString() === sectionId);
      const currentLesson = lessons[currentLessonIndex];
      
      if (!currentLesson) throw new Error('Lesson not found');

      const prevLesson = currentLessonIndex > 0 ? lessons[currentLessonIndex - 1] : null;
      const nextLesson = currentLessonIndex < lessons.length - 1 ? lessons[currentLessonIndex + 1] : null;

      return {
        module: module as Module,
        lessons: lessons as Lesson[],
        currentLesson,
        prevSection: prevLesson ? {
          moduleId: moduleId!,
          section: { id: prevLesson.id.toString(), title: "Lección anterior" }
        } : null,
        nextSection: nextLesson ? {
          moduleId: moduleId!,
          section: { id: nextLesson.id.toString(), title: "Siguiente lección" }
        } : null
      };
    },
  });

  if (isLoading || !sectionData) {
    return <div>Loading...</div>;
  }
  
  const { module, lessons, currentLesson, prevSection, nextSection } = sectionData;
  
  // Calculate current section number and total sections
  const currentSectionIndex = lessons.findIndex(l => l.id.toString() === sectionId) + 1;
  const totalSections = lessons.length;

  const mappedLessons = lessons.map(lesson => ({
    id: lesson.id.toString(),
    title: lesson.name,
    type: "video" as const
  }));
  
  return (
    <div>
      <TopBar />
      <Breadcrumbs />
      <div className="flex gap-6 max-w-[1600px] mx-auto p-4">
        {/* Main content */}
        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{currentLesson.name}</CardTitle>
              <CardDescription>{currentLesson.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {currentLesson.video_url && (
                <VideoPlayer url={currentLesson.video_url} />
              )}
              
              <ResourcesList resources={[]} />
            </CardContent>
          </Card>
          
          <NavigationButtons
            prevSection={prevSection}
            nextSection={nextSection}
          />
        </div>

        {/* Right navigation panel */}
        <div className="w-80 shrink-0">
          <NavigationPanel
            moduleTitle={module.name}
            currentSection={currentSectionIndex}
            totalSections={totalSections}
            sections={mappedLessons}
            moduleId={moduleId!}
            currentSectionId={sectionId!}
          />
        </div>
      </div>
    </div>
  );
}
