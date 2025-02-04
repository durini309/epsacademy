import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Section {
  id: string;
  title: string;
  type: "video" | "pdf";
  thumbnailUrl?: string;
  order: number;
}

interface NavigationPanelProps {
  courseId: string;
  moduleTitle: string;
  currentSection: number;
  totalSections: number;
  sections: Section[];
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
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg">{moduleTitle}</CardTitle>
        <CardDescription>Lección {currentSection} de {totalSections}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-2">
            {sections.map((section) => (
              <Link
                key={section.id}
                to={`/course/${courseId}/module/${moduleId}/lesson/${section.id}`}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  section.id === currentSectionId
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
                      <span className="text-secondary-foreground text-sm">No thumbnail</span>
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">
                    {section.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {section.type === "video" ? "Video" : "PDF"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};