
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Spline from '@splinetool/react-spline';

const HeroSection = () => {
  return (
    <section className="min-h-screen relative flex flex-col items-center justify-center text-center px-4">
      {/* Spline background */}
      <div className="absolute inset-0 -z-10">
        <Spline 
          scene="https://prod.spline.design/oy6BZwUYvFWAJfhj/scene.splinecode"
          style={{ 
            width: '100%', 
            height: '100%',
            filter: 'hue-rotate(85deg)' // This adjusts the color to match #34f657
          }}
        />
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
