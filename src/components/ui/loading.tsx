import { LoaderCircle } from "lucide-react";

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center gap-4">
      <LoaderCircle className="w-8 h-8 animate-spin text-primary" />
      <p className="text-foreground text-lg">Cargando</p>
    </div>
  );
};