
import { Card } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <Card className="p-8 md:p-12 border-muted bg-card/50 backdrop-blur">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <img
                src="/placeholder.svg"
                alt="Profile"
                className="rounded-lg shadow-xl"
                width={400}
                height={400}
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">Who Am I?</h2>
              <h3 className="text-xl text-primary font-mono mb-4">Senior Remote Developer & Mentor</h3>
              <p className="text-muted-foreground mb-6">
                With over a decade of experience in remote software development, I've helped hundreds of
                developers transition to rewarding remote careers. I understand the challenges and
                opportunities in today's remote work landscape.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default AboutSection;
