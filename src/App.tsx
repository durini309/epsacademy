
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import Hub from "@/pages/Hub";
import CoursePage from "@/pages/CoursePage";
import ModulePage from "@/pages/ModulePage";
import SectionPage from "@/pages/SectionPage";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import PasswordChange from "@/pages/PasswordChange";
import Landing from "@/pages/Landing";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/students-login" element={<Index />} />
            <Route path="/hub" element={<Hub />} />
            <Route path="/course/:courseId" element={<CoursePage />} />
            <Route path="/course/:courseId/module/:moduleId" element={<ModulePage />} />
            <Route path="/course/:courseId/module/:moduleId/lesson/:sectionId" element={<SectionPage />} />
            <Route path="/password" element={<PasswordChange />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
