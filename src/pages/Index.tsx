
import { Link } from "react-router-dom";
import { courses } from "@/lib/modules";

const Index = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-primary">Plataforma de Aprendizaje</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Link 
            key={course.id}
            to={`/course/${course.id}`}
            className="group hover:no-underline"
          >
            <div className="course-card group-hover:border-primary transition-colors">
              <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                <img 
                  src={course.imageUrl} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{course.title}</h2>
              <p className="text-muted-foreground">{course.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Index;
