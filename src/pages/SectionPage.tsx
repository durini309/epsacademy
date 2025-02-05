
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { NavigationPanel } from "@/components/section/NavigationPanel";
import { VideoPlayer } from "@/components/section/VideoPlayer";
import { ResourcesList } from "@/components/section/ResourcesList";
import { NavigationButtons } from "@/components/section/NavigationButtons";
import { TopBar } from "@/components/layout/TopBar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { supabase } from "@/integrations/supabase/client";
import { LoadingScreen } from "@/components/ui/loading";
import { useEffect } from "react";

const SectionPage = () => {
  const { courseId, moduleId, sectionId } = useParams();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['section', moduleId, sectionId],
    queryFn: async () => {
      const { data: module, error: moduleError } = await supabase
        .from('module')
        .select('*')
        .eq('id', parseInt(moduleId || '0'))
        .maybeSingle();

      if (moduleError) throw moduleError;

      const { data: sections, error: sectionsError } = await supabase
        .from('lesson')
        .select('*')
        .eq('module_id', parseInt(moduleId || '0'))
        .order('order');

      if (sectionsError) throw sectionsError;

      const { data: currentSection, error: sectionError } = await supabase
        .from('lesson')
        .select('*')
        .eq('id', parseInt(sectionId || '0'))
        .maybeSingle();

      if (sectionError) throw sectionError;

      const { data: extras, error: extrasError } = await supabase
        .from('lesson_extras')
        .select('*')
        .eq('lesson_id', parseInt(sectionId || '0'));

      if (extrasError) throw extrasError;

      return {
        module,
        sections,
        currentSection,
        currentSectionIndex: sections.findIndex(s => s.id === parseInt(sectionId || '0')) + 1,
        totalSections: sections.length,
        extras: extras || []
      };
    }
  });

  // Update current_lesson_id when viewing a lesson
  useEffect(() => {
    const updateCurrentLesson = async () => {
      if (courseId && sectionId) {
        const { error } = await supabase
          .from('user_course')
          .update({ currnent_lesson_id: parseInt(sectionId) })
          .eq('course_id', parseInt(courseId))
          .single();

        if (error) {
          console.error('Error updating current lesson:', error);
        } else {
          // Invalidate the course query to refresh the continue learning section
          queryClient.invalidateQueries({ queryKey: ['course', courseId] });
        }
      }
    };

    updateCurrentLesson();
  }, [courseId, sectionId, queryClient]);

  if (isLoading || !data) {
    return <LoadingScreen />;
  }

  const { module, sections, currentSection, currentSectionIndex, totalSections, extras } = data;

  return (
    <div>
      <TopBar />
      <Breadcrumbs />
      <div className="container py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold">{currentSection.name}</h1>
          <VideoPlayer url={currentSection.video_url} />
          <NavigationButtons
            courseId={courseId || ''}
            moduleId={moduleId || ''}
            currentLesson={currentSection}
          />
          <ResourcesList resources={extras} />
        </div>
        <div>
          <NavigationPanel
            courseId={courseId || ''}
            moduleId={moduleId || ''}
            moduleTitle={module.name}
            currentSection={currentSectionIndex}
            totalSections={totalSections}
            sections={sections}
            currentSectionId={sectionId || ''}
          />
        </div>
      </div>
    </div>
  );
};

export default SectionPage;
