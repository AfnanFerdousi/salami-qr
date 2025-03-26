
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  label: string;
  className?: string;
  previewUrl?: string;
  onRemove?: () => void;
}

const ImageUploader = ({
  onImageUpload,
  label,
  className,
  previewUrl,
  onRemove,
}: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <label className="block text-sm font-medium mb-2">{label}</label>
      {previewUrl ? (
        <div className="relative rounded-lg overflow-hidden group animate-fade-in">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-auto object-contain max-h-60"
          />
          {onRemove && (
            <Button
              onClick={onRemove}
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-all",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/20",
            "hover:border-primary/50 hover:bg-primary/5"
          )}
        >
          <div className="mb-3 rounded-full bg-primary/10 p-3">
            <ImageIcon className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">
            Drag & drop your image here
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            PNG, JPG or JPEG (max 5MB)
          </p>
          <div>
            <label htmlFor={`file-upload-${label}`}>
              <Button
                size="sm"
                type="button"
                className="cursor-pointer"
                variant="secondary"
              >
                <Upload className="h-4 w-4 mr-2" /> Upload
              </Button>
            </label>
            <input
              id={`file-upload-${label}`}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
