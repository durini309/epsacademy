
import HeroSection from "@/components/landing/HeroSection";
import AchievementsSection from "@/components/landing/AchievementsSection";
import StrugglesSection from "@/components/landing/StrugglesSection";
import AboutSection from "@/components/landing/AboutSection";
import CoursesSection from "@/components/landing/CoursesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";

const Landing = () => {
  return (
    <div className="bg-background">
      <HeroSection />
      <AchievementsSection />
      <StrugglesSection />
      <AboutSection />
      <CoursesSection />
      <TestimonialsSection />
    </div>
  );
};

export default Landing;
