import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";
import { Link } from "react-router-dom";

const UnderConstruction = () => {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md mx-auto">
        <Construction className="w-16 h-16 text-primary mx-auto animate-pulse" />
        <h1 className="text-3xl md:text-4xl font-bold font-mono">
          En construcción
        </h1>
        <p className="text-muted-foreground">
          Estamos trabajando para traerte contenido increíble. ¡Vuelve pronto!
        </p>
        <Link to="/">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 mt-8">
            Regresar al inicio
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default UnderConstruction;