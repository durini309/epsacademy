
import { useParams } from "react-router-dom";
import { courses } from "@/lib/modules";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CoursePage = () => {
  const { courseId } = useParams();
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return <div>Curso no encontrado</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{course.title}</CardTitle>
          <CardDescription className="text-lg">{course.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video mb-6">
            <img 
              src={course.imageUrl} 
              alt={course.title} 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoursePage;
