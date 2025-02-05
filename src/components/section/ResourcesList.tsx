
import { Presentation, FileText, Globe, Text } from "lucide-react";

interface Resource {
  id: number;
  label: string;
  url: string | null;
  type: string;
}

interface ResourcesListProps {
  resources: Resource[];
}

export const ResourcesList = ({ resources }: ResourcesListProps) => {
  const getIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case 'SLIDES':
        return <Presentation className="h-4 w-4" />;
      case 'DOC':
        return <FileText className="h-4 w-4" />;
      case 'WEBSITE':
        return <Globe className="h-4 w-4" />;
      case 'TEXT':
        return <Text className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Sort resources by type in the specified order
  const sortOrder = { 'SLIDES': 1, 'DOC': 2, 'WEBSITE': 3, 'TEXT': 4 };
  const sortedResources = [...resources].sort((a, b) => 
    sortOrder[a.type.toUpperCase() as keyof typeof sortOrder] - 
    sortOrder[b.type.toUpperCase() as keyof typeof sortOrder]
  );

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Recursos</h3>
      {(!resources || resources.length === 0) ? (
        <p className="text-muted-foreground">No hay recursos para esta lección</p>
      ) : (
        <div className="space-y-2">
          {sortedResources.map((resource) => {
            const isClickable = resource.type.toUpperCase() !== 'TEXT' && resource.url;
            
            const content = (
              <div className="flex items-center gap-2 text-primary">
                {getIcon(resource.type)}
                <span className={isClickable ? "hover:underline cursor-pointer" : ""}>
                  {resource.label}
                </span>
              </div>
            );

            return (
              <div key={resource.id}>
                {isClickable && resource.url ? (
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
