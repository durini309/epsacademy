
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen relative flex flex-col items-center justify-center text-center px-4">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/lovable-uploads/b72bc4ff-a630-4a58-b390-d759a4c84e22.png")',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      {/* Content with backdrop blur for better readability */}
      <div className="relative z-10 backdrop-blur-sm bg-background/50 p-8 rounded-lg">
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
      </div>
    </section>
  );
};

export default HeroSection;
