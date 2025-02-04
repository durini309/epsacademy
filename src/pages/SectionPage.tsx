
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { VideoPlayer } from "@/components/section/VideoPlayer";
import { ResourcesList } from "@/components/section/ResourcesList";
import { NavigationPanel } from "@/components/section/NavigationPanel";
import { NavigationButtons } from "@/components/section/NavigationButtons";
import { findSectionData } from "@/lib/modules";

export default function SectionPage() {
  const { moduleId, sectionId } = useParams();
  
  if (!moduleId || !sectionId) {
    return <div>Error: Sección no encontrada</div>;
  }
  
  const sectionData = findSectionData(moduleId, sectionId);
  
  if (!sectionData) {
    return <div>Error: Sección no encontrada</div>;
  }
  
  const { module, section, prevSection, nextSection } = sectionData;
  
  // Calculate current section number and total sections
  const currentSectionIndex = module.sections.findIndex(s => s.id === sectionId) + 1;
  const totalSections = module.sections.length;
  
  return (
    <div className="flex gap-6 max-w-[1600px] mx-auto p-4">
      {/* Main content */}
      <div className="flex-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
            <CardDescription>{section.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {section.type === "video" && section.videoUrl && (
              <VideoPlayer url={section.videoUrl} />
            )}
            
            <ResourcesList resources={section.resources || []} />
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
          moduleTitle={module.title}
          currentSection={currentSectionIndex}
          totalSections={totalSections}
          sections={module.sections}
          moduleId={moduleId}
          currentSectionId={sectionId}
        />
      </div>
    </div>
  );
}
