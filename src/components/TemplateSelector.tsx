
import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  borderStyle: string;
  borderColor: string;
}

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplate: Template | null;
  onSelectTemplate: (template: Template) => void;
}

const TemplateSelector = ({
  templates,
  selectedTemplate,
  onSelectTemplate,
}: TemplateSelectorProps) => {
  return (
    <div className="w-full">
      <h3 className="text-sm font-medium mb-3">Choose a template</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={cn(
              "relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-1",
              selectedTemplate?.id === template.id
                ? "border-primary ring-2 ring-primary/20"
                : "border-border hover:border-primary/50"
            )}
            onClick={() => onSelectTemplate(template)}
          >
            <img
              src={template.thumbnail}
              alt={template.name}
              className="w-full h-auto aspect-[3/4] object-cover"
            />
            {selectedTemplate?.id === template.id && (
              <div className="absolute top-2 right-2 bg-primary rounded-full p-0.5">
                <Check className="h-3 w-3 text-white" />
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-2">
              <p className="text-white text-xs font-medium truncate">
                {template.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
