
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Remote Developer at Tech Co",
    comment: "This course was exactly what I needed to land my dream remote job. The focus on soft skills really set it apart from other technical courses.",
    avatar: "/placeholder.svg",
  },
  {
    name: "Michael Chen",
    role: "Remote Developer at Tech Co",
    comment: "This course was exactly what I needed to land my dream remote job. The focus on soft skills really set it apart from other technical courses.",
    avatar: "/placeholder.svg",
  },
  {
    name: "Emma Williams",
    role: "Remote Developer at Tech Co",
    comment: "This course was exactly what I needed to land my dream remote job. The focus on soft skills really set it apart from other technical courses.",
    avatar: "/placeholder.svg",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-mono text-center mb-12">
          What Our Students Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-muted bg-card/50 backdrop-blur">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.comment}"</p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <CheckCircle key={i} className="text-primary w-5 h-5" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
