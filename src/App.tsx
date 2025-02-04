import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/lib/auth";
import Index from "./pages/Index";
import Hub from "./pages/Hub";
import NotFound from "./pages/NotFound";
import SectionPage from "./pages/SectionPage";
import CoursePage from "./pages/CoursePage";
import ModulePage from "./pages/ModulePage";
import PasswordChange from "./pages/PasswordChange";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  if (loading) return null;
  if (!user) return <Navigate to="/" />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/password" element={<PasswordChange />} />
          <Route 
            path="/hub" 
            element={
              <ProtectedRoute>
                <Hub />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/course/:courseId" 
            element={
              <ProtectedRoute>
                <CoursePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/course/:courseId/module/:moduleId" 
            element={
              <ProtectedRoute>
                <ModulePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/course/:courseId/module/:moduleId/lesson/:sectionId" 
            element={
              <ProtectedRoute>
                <SectionPage />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;