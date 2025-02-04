
const Index = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-primary">Bienvenido a Curso - Fundamentos del Programador Superior</h1>
      
      <div className="grid gap-6">
        <div className="course-card">
          <h2 className="text-2xl font-bold mb-4">Comenzar</h2>
          <p className="text-muted-foreground mb-4">
            Comienza tu viaje para convertirte en un programador superior. Selecciona un módulo desde el menú lateral para empezar a aprender.
          </p>
          <div className="flex items-center gap-4">
            <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-0 bg-primary rounded-full transition-all duration-500" />
            </div>
            <span className="text-sm text-muted-foreground">0%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
