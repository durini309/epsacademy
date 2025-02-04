
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationButtonsProps {
  prevSection: { moduleId: string; section: { id: string; title: string } } | null;
  nextSection: { moduleId: string; section: { id: string; title: string } } | null;
}

export const NavigationButtons = ({ prevSection, nextSection }: NavigationButtonsProps) => {
  return (
    <div className="flex justify-between items-center">
      {prevSection ? (
        <Link to={`/module/${prevSection.moduleId}/section/${prevSection.section.id}`}>
          <Button variant="outline">
            <ChevronLeft className="mr-2" />
            {prevSection.section.title}
          </Button>
        </Link>
      ) : (
        <div /> /* Empty div for spacing */
      )}
      
      {nextSection && (
        <Link to={`/module/${nextSection.moduleId}/section/${nextSection.section.id}`}>
          <Button>
            {nextSection.section.title}
            <ChevronRight className="ml-2" />
          </Button>
        </Link>
      )}
    </div>
  );
};
