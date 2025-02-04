
export type Course = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  modules: Module[];
};

export type Module = {
  id: number;
  title: string;
  sections: Section[];
};

export type Section = {
  id: string;
  title: string;
  type: "video" | "pdf";
  description: string;
  videoUrl?: string;
  resources: { title: string; url: string; }[];
};

export const courses: Course[] = [
  {
    id: "prog-sup",
    title: "Fundamentos del Programador Superior",
    description: "Aprende los conceptos fundamentales que todo programador superior debe conocer, desde patrones de diseño hasta arquitectura de software.",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80",
    modules: [
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
    ]
  },
  {
    id: "web-dev",
    title: "Desarrollo Web Avanzado",
    description: "Domina las últimas tecnologías y mejores prácticas en el desarrollo web moderno. Desde frontend hasta backend.",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80",
    modules: []
  }
];

export const findSectionData = (moduleId: string, sectionId: string) => {
  // Find the course that contains this module
  const course = courses.find(course => 
    course.modules.some(m => m.id === parseInt(moduleId))
  );
  
  if (!course) return null;
  
  const module = course.modules.find(m => m.id === parseInt(moduleId));
  if (!module) return null;
  
  const sectionIndex = module.sections.findIndex(s => s.id === sectionId);
  if (sectionIndex === -1) return null;
  
  const section = module.sections[sectionIndex];
  
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
