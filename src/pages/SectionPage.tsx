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
import { LoadingScreen } from "@/components/ui/loading";
import { useAuthStore } from "@/lib/auth";
import { useEffect } from "react";

export default function SectionPage() {
  const { courseId, moduleId, sectionId } = useParams();
  const user = useAuthStore((state) => state.user);
  
  const { data: sectionData, isLoading } = useQuery({
    queryKey: ['lesson', moduleId, sectionId],
    queryFn: async () => {
      const { data: module, error: moduleError } = await supabase
        .from('module')
        .select('*')
        .eq('id', parseInt(moduleId || '0'))
        .single();

      if (moduleError) throw moduleError;

      const { data: lessons, error: lessonsError } = await supabase
        .from('lesson')
        .select('*')
        .eq('module_id', parseInt(moduleId || '0'))
        .order('order');

      if (lessonsError) throw lessonsError;

      const currentLessonIndex = lessons.findIndex(l => l.id === parseInt(sectionId || '0'));
      const currentLesson = lessons[currentLessonIndex];
      
      if (!currentLesson) throw new Error('Lesson not found');

      return {
        module: module as Module,
        lessons: lessons as Lesson[],
        currentLesson,
      };
    },
  });

  // Update current_lesson_id when viewing a lesson
  useEffect(() => {
    if (sectionData?.currentLesson && user) {
      const updateCurrentLesson = async () => {
        const { data: userData } = await supabase
          .from('user')
          .select('id')
          .eq('auth_id', user.id)
          .single();

        if (userData) {
          await supabase
            .from('user_course')
            .update({ currnent_lesson_id: sectionData.currentLesson.id })
            .eq('user_id', userData.id)
            .eq('course_id', parseInt(courseId || '0'));
        }
      };

      updateCurrentLesson();
    }
  }, [sectionData?.currentLesson, user, courseId]);

  if (isLoading || !sectionData) {
    return <LoadingScreen />;
  }

  const { module, lessons, currentLesson } = sectionData;
  
  // Calculate current section number and total sections
  const currentSectionIndex = lessons.findIndex(l => l.id === parseInt(sectionId || '0')) + 1;
  const totalSections = lessons.length;

  const mappedLessons = lessons.map(lesson => ({
    id: lesson.id.toString(),
    title: lesson.name,
    type: "video" as const,
    thumbnailUrl: lesson.thumbnail_url,
    order: lesson.order
  }));
  
  return (
    <div>
      <TopBar />
      <Breadcrumbs />
      <div className="flex gap-6 max-w-[1600px] mx-auto p-4">
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
            courseId={courseId || ''}
            moduleId={moduleId || ''}
            currentLesson={currentLesson}
          />
        </div>

        <div className="w-80 shrink-0">
          <NavigationPanel
            courseId={courseId || ''}
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