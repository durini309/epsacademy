
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50 mb-6">
        Land Your Dream Remote Developer Job
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
        Master the soft skills and strategies that will set you apart in today's
        competitive remote job market
      </p>
      <Button size="lg" className="group">
        Explore Courses
        <ChevronDown className="group-hover:translate-y-1 transition-transform" />
      </Button>
    </section>
  );
};

export default HeroSection;
