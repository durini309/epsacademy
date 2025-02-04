
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Section {
  id: string;
  title: string;
  type: "video" | "pdf";
}

interface NavigationPanelProps {
  moduleTitle: string;
  currentSection: number;
  totalSections: number;
  sections: Section[];
  moduleId: string;
  currentSectionId: string;
}

export const NavigationPanel = ({
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
      <CardContent className="space-y-2">
        {sections.map((section) => (
          <Link
            key={section.id}
            to={`/module/${moduleId}/section/${section.id}`}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              section.id === currentSectionId
                ? "bg-secondary"
                : "hover:bg-secondary/50"
            }`}
          >
            <div className="w-24 h-16 bg-muted rounded flex items-center justify-center shrink-0">
              <Play className="h-6 w-6 text-muted-foreground" />
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
      </CardContent>
    </Card>
  );
};
