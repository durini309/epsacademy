import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Video, Clock } from "lucide-react";

interface Section {
  id: number;
  title: string;
  type: "video" | "pdf";
  thumbnailUrl?: string;
  order: number;
  lengthSec?: number;
}

interface NavigationPanelProps {
  courseId: string;
  moduleTitle: string;
  currentSection: number;
  totalSections: number;
  sections: any[]; // We'll map the data to match Section type
  moduleId: string;
  currentSectionId: string;
}

export const NavigationPanel = ({
  courseId,
  moduleTitle,
  currentSection,
  totalSections,
  sections,
  moduleId,
  currentSectionId,
}: NavigationPanelProps) => {
  // Map the lesson data to match our Section interface
  const mappedSections: Section[] = sections.map((lesson) => ({
    id: lesson.id,
    title: lesson.name,
    type: lesson.video_url ? "video" : "pdf",
    thumbnailUrl: lesson.thumbnail_url,
    order: lesson.order,
    lengthSec: lesson.length_sec,
  }));

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg">{moduleTitle}</CardTitle>
        <CardDescription>Lección {currentSection} de {totalSections}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-2">
            {mappedSections.map((section) => (
              <Link
                key={section.id}
                to={`/course/${courseId}/module/${moduleId}/lesson/${section.id}`}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  section.id === parseInt(currentSectionId)
                    ? "bg-secondary"
                    : "hover:bg-secondary/50"
                }`}
              >
                <span className="text-lg font-semibold text-muted-foreground w-6 shrink-0 text-center">
                  {section.order}
                </span>
                <div className="w-24 h-16 bg-muted rounded flex items-center justify-center shrink-0 overflow-hidden">
                  {section.thumbnailUrl ? (
                    <img 
                      src={section.thumbnailUrl} 
                      alt={section.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-secondary flex items-center justify-center">
                      {section.type === "video" ? (
                        <Video className="h-6 w-6 text-secondary-foreground opacity-50" />
                      ) : (
                        <FileText className="h-6 w-6 text-secondary-foreground opacity-50" />
                      )}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">
                    {section.title}
                  </p>
                  {section.lengthSec && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDuration(section.lengthSec)}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};