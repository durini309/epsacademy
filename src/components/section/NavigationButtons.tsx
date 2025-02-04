import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationButtonsProps {
  courseId: string;
  moduleId: string;
  currentLesson: {
    id: number;
    next_lesson_id: number | null;
    previous_lesson_id: number | null;
  } | null;
}

export const NavigationButtons = ({ courseId, moduleId, currentLesson }: NavigationButtonsProps) => {
  if (!currentLesson) return null;

  return (
    <div className="flex justify-between items-center">
      {currentLesson.previous_lesson_id ? (
        <Link to={`/course/${courseId}/module/${moduleId}/lesson/${currentLesson.previous_lesson_id}`}>
          <Button variant="outline">
            <ChevronLeft className="mr-2" />
            Lección anterior
          </Button>
        </Link>
      ) : (
        <div /> /* Empty div for spacing */
      )}
      
      {currentLesson.next_lesson_id ? (
        <Link to={`/course/${courseId}/module/${moduleId}/lesson/${currentLesson.next_lesson_id}`}>
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