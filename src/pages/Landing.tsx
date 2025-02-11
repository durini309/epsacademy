
import HeroSection from "@/components/landing/HeroSection";
import AchievementsSection from "@/components/landing/AchievementsSection";
import StrugglesSection from "@/components/landing/StrugglesSection";
import AboutSection from "@/components/landing/AboutSection";
import CoursesSection from "@/components/landing/CoursesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import { Footer } from "@/components/layout/Footer";

const Landing = () => {
  return (
    <main className="bg-background">
      <div className="font-sans [&_*]:font-sans">
        <HeroSection />
        <AchievementsSection />
        <StrugglesSection />
        <AboutSection />
        <CoursesSection />
        <TestimonialsSection />
        <Footer />
      </div>
    </main>
  );
};

export default Landing;
