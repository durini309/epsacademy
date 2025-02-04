import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationButtonsProps {
  moduleId: string;
  currentLesson: {
    id: string;
    next_lesson_id: number | null;
    previous_lesson_id: number | null;
  };
}

export const NavigationButtons = ({ moduleId, currentLesson }: NavigationButtonsProps) => {
  return (
    <div className="flex justify-between items-center">
      {currentLesson.previous_lesson_id ? (
        <Link to={`/module/${moduleId}/lesson/${currentLesson.previous_lesson_id}`}>
          <Button variant="outline">
            <ChevronLeft className="mr-2" />
            Lección anterior
          </Button>
        </Link>
      ) : (
        <div /> /* Empty div for spacing */
      )}
      
      {currentLesson.next_lesson_id ? (
        <Link to={`/module/${moduleId}/lesson/${currentLesson.next_lesson_id}`}>
          <Button>
            Siguiente lección
            <ChevronRight className="ml-2" />
          </Button>
        </Link>
      ) : (
        <Button>
          Completar módulo
          <ChevronRight className="ml-2" />
        </Button>
      )}
    </div>
  );
};