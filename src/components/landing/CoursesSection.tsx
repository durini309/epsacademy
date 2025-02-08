
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const courses = [
  {
    title: "Remote Job Mastery",
    description: "Master the art of remote job hunting with our comprehensive course covering everything from resume building to interview techniques.",
    image: "/placeholder.svg",
    badge: "BEST SELLER",
    tags: ["Interview Skills", "Resume Writing", "Portfolio Building"],
  },
  {
    title: "Soft Skills for Developers",
    description: "Learn the essential soft skills that will make you stand out in the remote work environment and collaborate effectively with global teams.",
    image: "/placeholder.svg",
    badge: "NEW",
    tags: ["Communication", "Time Management", "Leadership"],
  },
];

const CoursesSection = () => {
  return (
    <section className="py-20 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-mono text-center mb-12">
          Available Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course) => (
            <Card key={course.title} className="border-muted bg-card/50 backdrop-blur">
              <CardHeader className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="rounded-t-lg w-full h-48 object-cover"
                />
                {course.badge && (
                  <Badge
                    className="absolute top-4 right-4"
                    variant={course.badge === "NEW" ? "destructive" : "default"}
                  >
                    {course.badge}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                <CardTitle className="font-mono">{course.title}</CardTitle>
                <p className="text-muted-foreground">{course.description}</p>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button className="w-full">Enroll Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
