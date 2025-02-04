import { useParams, Link } from "react-router-dom";
import { CourseLayout } from "@/components/CourseLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

// Helper function to find section data
const findSectionData = (moduleId: string, sectionId: string) => {
  const module = modules.find(m => m.id === parseInt(moduleId));
  if (!module) return null;
  
  const sectionIndex = module.sections.findIndex(s => s.id === sectionId);
  if (sectionIndex === -1) return null;
  
  const section = module.sections[sectionIndex];
  
  // Calculate previous and next sections
  const prevSection = sectionIndex > 0 ? 
    { moduleId, section: module.sections[sectionIndex - 1] } :
    null;
  
  const nextSection = sectionIndex < module.sections.length - 1 ?
    { moduleId, section: module.sections[sectionIndex + 1] } :
    null;
  
  return {
    module,
    section,
    prevSection,
    nextSection
  };
};

// Module data (we'll move this to a separate file later)
const modules = [
  {
    id: 1,
    title: "Introducción a la Programación Superior",
    sections: [
      { 
        id: "1-1", 
        title: "¿Qué es un Programador Superior?", 
        type: "video",
        description: "En esta sección aprenderás los conceptos fundamentales que definen a un Programador Superior y su rol en el desarrollo de software moderno.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        resources: [
          { title: "Guía de Estudio", url: "#" },
          { title: "Ejercicios Prácticos", url: "#" }
        ]
      },
      { 
        id: "1-2", 
        title: "Configuración del Entorno", 
        type: "video",
        description: "Aprenderás a configurar tu entorno de desarrollo de manera profesional.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        resources: [
          { title: "Lista de Herramientas", url: "#" }
        ]
      },
    ]
  },
  {
    id: 2,
    title: "Fundamentos de Algoritmos",
    sections: [
      { 
        id: "2-1", 
        title: "Estructuras de Datos Básicas", 
        type: "video",
        description: "Exploraremos las estructuras de datos fundamentales que todo programador debe conocer.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        resources: [
          { title: "Ejemplos de Código", url: "#" },
          { title: "Ejercicios", url: "#" }
        ]
      },
      { 
        id: "2-2", 
        title: "Algoritmos de Búsqueda", 
        type: "video",
        description: "Aprenderás los algoritmos de búsqueda más importantes y cuándo utilizarlos.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        resources: []
      },
      { 
        id: "2-3", 
        title: "Recursos Adicionales", 
        type: "pdf",
        description: "Material complementario para profundizar en los conceptos aprendidos.",
        resources: [
          { title: "Guía Completa PDF", url: "#" }
        ]
      },
    ]
  },
  {
    id: 3,
    title: "Patrones de Diseño",
    sections: [
      { 
        id: "3-1", 
        title: "Introducción a Patrones", 
        type: "video",
        description: "Introducción a los patrones de diseño y su importancia en el desarrollo de software.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        resources: []
      },
      { 
        id: "3-2", 
        title: "Patrones Creacionales", 
        type: "video",
        description: "Aprenderás los patrones de diseño creacionales más utilizados.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        resources: []
      },
      { 
        id: "3-3", 
        title: "Ejercicios Prácticos", 
        type: "pdf",
        description: "Ejercicios para practicar la implementación de patrones de diseño.",
        resources: [
          { title: "Ejercicios PDF", url: "#" }
        ]
      },
    ]
  }
];

export default function SectionPage() {
  const { moduleId, sectionId } = useParams();
  
  if (!moduleId || !sectionId) {
    return <div>Error: Sección no encontrada</div>;
  }
  
  const sectionData = findSectionData(moduleId, sectionId);
  
  if (!sectionData) {
    return <div>Error: Sección no encontrada</div>;
  }
  
  const { module, section, prevSection, nextSection } = sectionData;
  
  return (
    <CourseLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
            <CardDescription>{section.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {section.type === "video" && section.videoUrl && (
              <div className="aspect-video mb-6">
                <iframe
                  className="w-full h-full rounded-lg"
                  src={section.videoUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
            
            {section.resources && section.resources.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Recursos Adicionales</h3>
                <div className="space-y-2">
                  {section.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {resource.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="flex justify-between items-center">
          {prevSection ? (
            <Link to={`/module/${prevSection.moduleId}/section/${prevSection.section.id}`}>
              <Button variant="outline">
                <ChevronLeft className="mr-2" />
                {prevSection.section.title}
              </Button>
            </Link>
          ) : (
            <div /> {/* Empty div for spacing */}
          )}
          
          {nextSection && (
            <Link to={`/module/${nextSection.moduleId}/section/${nextSection.section.id}`}>
              <Button>
                {nextSection.section.title}
                <ChevronRight className="ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </CourseLayout>
  );
}