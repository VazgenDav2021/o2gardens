import { useRef } from "react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Upload } from "lucide-react";
import { getImageUrl } from "@/lib/getImageUrl";

interface SlideInputProps {
  image: string;
  onChange: (value: string | File) => void;
}

export const SlideInput = ({ image, onChange }: SlideInputProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange(file);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2 justify-between items-center">
        <Label>Изображение слайда</Label>
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => fileInputRef.current?.click()}>
          <Upload className="w-4 h-4" />
          Загрузить
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {image && (
        <img
          src={getImageUrl(image)}
          alt="Preview"
          className="mt-2 w-full h-48 object-cover rounded-lg"
        />
      )}
    </div>
  );
};
