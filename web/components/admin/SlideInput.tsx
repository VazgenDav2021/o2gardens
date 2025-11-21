import { useRef } from "react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Upload } from "lucide-react";

interface SlideInputProps {
  image: string;
  onChange: (value: string | File) => void;
}

export const SlideInput = ({ image, onChange }: SlideInputProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    onChange(previewUrl);
  };

  return (
    <div className="space-y-2">
      <Label>Изображение слайда</Label>

      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="URL изображения"
          value={image}
          onChange={(e) => onChange(e.target.value)}
        />

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
          src={image}
          alt="Preview"
          className="mt-2 w-full h-48 object-cover rounded-lg"
        />
      )}
    </div>
  );
};
