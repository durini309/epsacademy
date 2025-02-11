import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Users, Target, Brain, FileText, Search, Award, ArrowRight } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";

const RemoteWorkCourse = () => {
    const targetAudience = [
        {
            icon: Users,
            title: "Programadores Presenciales",
            description: "Que buscan liberarse de la oficina tradicional"
        },
        {
            icon: Target,
            title: "Desarrolladores Ambiciosos",
            description: "En búsqueda de mejores oportunidades laborales"
        },
        {
            icon: Award,
            title: "Profesionales Tech",
            description: "Que merecen ser mejor valorados por su trabajo"
        }
    ];

    const courseContent = [
        {
            icon: Brain,
            title: "Soft Skills",
            description: "Habilidades cruciales para el trabajo remoto"
        },
        {
            icon: FileText,
            title: "CV y Portafolio",
            description: "Sabrás cómo crear un portafolio atractivo y un CV optimizado para ATS"
        },
        {
            icon: Search,
            title: "Búsqueda Efectiva",
            description: "Estrategias en LinkedIn y otras plataformas"
        },
    ];

    const outcomes = [
        "Dominio de habilidades no técnicas para trabajo remoto",
        "Capacidad de aspirar a sueldos competitivos",
        "Presencia profesional destacada",
        "Herramientas para búsqueda efectiva",
    ];

    const faqs = [
        {
            question: "¿Es sólo para programadores?",
            answer: "Si no eres programador sí te puedes beneficiar de este curso. En el curso no miramos nada técnico, sin embargo, se mencionan ejemplos específicos para programadores."
        },
        {
            question: "¿Qué lenguaje de programación usaremos?",
            answer: "¡Ninguno! Este es un curso no técnico, así que ya sea que sepas Python, Java, Assembler o Go, no importa. Este curso está diseñado para ser accesible para todos."
        },
        {
            question: "¿Necesito experiencia previa?",
            answer: "No necesitas experiencia previa para comenzar este curso."
        },
        {
            question: "¿Cuánto tiempo necesito dedicarle?",
            answer: "El curso está estructurado para completarse en 4 semanas, dedicando 2-3 horas semanales."
        },
        {
            question: "¿Incluye soporte personalizado?",
            answer: "Este curso introductorio no incluye mentorías personalizadas. Para coaching individual, considera el framework del programador superior."
        },
        {
            question: "¿Al cuánto timpo conseguiré mi trabajo?",
            answer: "El éxito depende de múltiples factores, siendo tu dedicación el más importante de todos. El curso te da las herramientas y estrategias probadas. Si aplicas todo lo aprendido en el curso y estás comprometido con hacer el trabajo, puede tomarte entre 6 a 12 meses."
        }
    ];

    return (
        <main className="bg-background min-h-screen font-sans [&_*]:font-sans">
            {/* Hero Section */}
            <section className="py-20 px-4 text-center relative">
                <div className="max-w-4xl mx-auto space-y-6">
                    <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-tight">
                        <span className="text-white">Domina el arte</span><br />
                        <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 text-transparent bg-clip-text">del trabajo remoto</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground">
                        ¿Buscas dar el salto al trabajo remoto pero no sabes por dónde empezar?
                    </p>
                    <p className="text-muted-foreground">
                        Por Juan Carlos Durini, fundador de "El Programador Superior"
                    </p>
                </div>
            </section>

            {/* Pain Points Section */}
            <section className="py-20 px-4 bg-secondary/20">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold font-mono text-center mb-8">
                        ¿Te sientes estancado en tu carrera como programador?
                    </h2>
                    <div className="space-y-6 text-lg text-muted-foreground">
                        <p>
                            Ya sea que estés comenzando tu carrera o tengas años de experiencia, la frustración es la misma: ves cómo otros desarrolladores consiguen trabajos remotos con salarios que parecen inalcanzables, mientras tú sigues luchando por conseguir siquiera una entrevista.
                        </p>
                        <p>
                            Las dudas empiezan a surgir: ¿será que no soy lo suficientemente bueno? ¿me falta más experiencia técnica?
                        </p>
                        <p className="font-medium text-foreground">
                            La realidad es que no es tu código el problema - es que nadie te ha enseñado las habilidades cruciales que te permitirían destacar en el mercado internacional.
                        </p>
                        <p>
                            Esas mismas habilidades que hacen que algunos desarrolladores consigan oportunidades increíbles mientras otros, igualmente capaces, siguen siendo ignorados.
                        </p>
                    </div>
                    <div className="mt-12 text-center">
                        <a
                            href="https://app.recurrente.com/s/programador-superior/curso-trabaja-remoto-como-programador"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button size="lg" className="text-lg px-8 bg-primary text-primary-foreground hover:bg-primary/90">
                                Comienza tu transformación
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            {/* Target Audience */}
            <section className="py-20 px-4 bg-background">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold font-mono text-center mb-12">
                        ¿Para quién es este curso?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {targetAudience.map((item) => (
                            <Card key={item.title} className="border-muted bg-card/50">
                                <CardContent className="pt-6">
                                    <item.icon className="w-12 h-12 text-primary mb-4" />
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Course Content */}
            <section className="py-20 px-4 bg-secondary/20">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold font-mono text-center mb-12">
                        ¿Qué aprenderás?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courseContent.map((item) => (
                            <div key={item.title} className="flex gap-4">
                                <item.icon className="w-8 h-8 text-primary shrink-0" />
                                <div>
                                    <h3 className="font-bold mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                        <a
                            href="https://app.recurrente.com/s/programador-superior/curso-trabaja-remoto-como-programador"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button size="lg" className="text-lg px-8 bg-primary text-primary-foreground hover:bg-primary/90">
                                Empieza a aprender
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            {/* Outcomes */}
            <section className="py-20 px-4 bg-secondary/10">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold font-mono text-center mb-12">
                        Al finalizar este curso
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {outcomes.map((outcome) => (
                            <div key={outcome} className="flex items-start gap-4">
                                <Check className="w-6 h-6 text-primary shrink-0" />
                                <p className="text-muted-foreground">{outcome}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <Card className="relative overflow-hidden border-primary">
                        <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 via-emerald-500/5 to-green-500/10" />
                        <CardContent className="relative p-8 text-center space-y-6">
                            <h2 className="text-2xl md:text-3xl font-bold font-mono">
                                Da el primer paso para conseguir el trabajo de tus sueños
                            </h2>
                            <div className="space-y-2">
                                <p className="text-xl line-through text-muted-foreground">$99.99</p>
                                <p className="text-5xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 text-transparent bg-clip-text">
                                    $49.99
                                </p>
                            </div>
                            <a
                                href="https://app.recurrente.com/s/programador-superior/curso-trabaja-remoto-como-programador"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button size="lg" className="text-lg px-12 mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
                                    Reserva tu cupo
                                </Button>
                            </a>
                        </CardContent>
                    </Card>
                    <Card className="bg-secondary/20 mt-8">
                        <CardContent className="pt-6">
                            <p className="text-muted-foreground mb-4">
                                Nota: Este es un curso introductorio. Para una transformación más profunda y coaching personalizado, consulta el programa completo "El Programador Superior".
                            </p>
                            <div className="flex flex-row w-full justify-end">
                            <Link to="/about-framework">
                                <Button variant="link" className="text-primary">
                                    Conoce más
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>


            {/* FAQs Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto space-y-4">
                    <h2 className="text-3xl font-bold font-mono text-center mb-12">
                        Preguntas Frecuentes
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Accordion type="single" collapsible className="space-y-4">
                            {faqs.slice(0, Math.ceil(faqs.length / 2)).map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="border border-primary/20 bg-secondary/20 data-[state=open]:bg-secondary/40 transition-colors duration-300"
                                >
                                    <AccordionTrigger className="px-6 py-4 hover:no-underline group flex justify-between">
                                        <span className="text-base font-medium text-left flex-1">
                                            {faq.question}
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-4 text-muted-foreground">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                        <Accordion type="single" collapsible className="space-y-4">
                            {faqs.slice(Math.ceil(faqs.length / 2)).map((faq, index) => (
                                <AccordionItem
                                    key={index + Math.ceil(faqs.length / 2)}
                                    value={`item-${index + Math.ceil(faqs.length / 2)}`}
                                    className="border border-primary/20 bg-secondary/20 data-[state=open]:bg-secondary/40 transition-colors duration-300"
                                >
                                    <AccordionTrigger className="px-6 py-4 hover:no-underline group flex justify-between">
                                        <span className="text-base font-medium text-left flex-1">
                                            {faq.question}
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-4 text-muted-foreground">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </main>
    );
};

export default RemoteWorkCourse;