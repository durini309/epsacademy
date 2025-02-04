import { LoaderCircle } from "lucide-react";

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <LoaderCircle className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
};