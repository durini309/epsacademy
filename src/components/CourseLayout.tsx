import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseLayoutProps {
  children: React.ReactNode;
}

export function CourseLayout({ children }: CourseLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
              {/* Navigation content will go here */}
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