import { useState } from "react";
import { Menu, X, BookOpen, Video, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface CourseLayoutProps {
  children: React.ReactNode;
}

const modules = [
  {
    id: 1,
    title: "Introducción a la Programación Superior",
    sections: [
      { id: "1-1", title: "¿Qué es un Programador Superior?", type: "video" },
      { id: "1-2", title: "Configuración del Entorno", type: "video" },
    ]
  },
  {
    id: 2,
    title: "Fundamentos de Algoritmos",
    sections: [
      { id: "2-1", title: "Estructuras de Datos Básicas", type: "video" },
      { id: "2-2", title: "Algoritmos de Búsqueda", type: "video" },
      { id: "2-3", title: "Recursos Adicionales", type: "pdf" },
    ]
  },
  {
    id: 3,
    title: "Patrones de Diseño",
    sections: [
      { id: "3-1", title: "Introducción a Patrones", type: "video" },
      { id: "3-2", title: "Patrones Creacionales", type: "video" },
      { id: "3-3", title: "Ejercicios Prácticos", type: "pdf" },
    ]
  }
];

export function CourseLayout({ children }: CourseLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  const toggleModule = (moduleId: number) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  return (
    <div className="min-h-screen bg-background">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-secondary rounded-lg md:hidden"
      >
        {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      
      <div className="flex min-h-screen">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 transform bg-secondary transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:inset-auto md:w-64",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col h-full">
            <div className="p-4">
              <img 
                src="/lovable-uploads/12af3053-9f8f-47bc-ae60-7eb50a02d5a4.png" 
                alt="El Programador Superior" 
                className="h-12 w-auto"
              />
            </div>
            <nav className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {modules.map((module) => (
                  <div key={module.id} className="space-y-1">
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full flex items-center justify-between p-2 text-sm font-medium rounded-md hover:bg-primary/10 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        <span>{module.title}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {expandedModule === module.id ? '−' : '+'}
                      </span>
                    </button>
                    
                    {expandedModule === module.id && (
                      <div className="ml-4 space-y-1">
                        {module.sections.map((section) => (
                          <Link
                            key={section.id}
                            to={`/module/${module.id}/section/${section.id}`}
                            className="flex items-center gap-2 p-2 text-sm rounded-md hover:bg-primary/10 transition-colors"
                          >
                            {section.type === 'video' ? (
                              <Video className="h-4 w-4" />
                            ) : (
                              <FileText className="h-4 w-4" />
                            )}
                            <span>{section.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </nav>
          </div>
        </aside>

        <main className="flex-1 overflow-x-hidden p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}