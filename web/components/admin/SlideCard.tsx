import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { X, Save } from "lucide-react";
import { SlideInput } from "./SlideInput";
import { Slide } from "@/types";

interface SlideCardProps {
  slide: Slide;
  index: number;
  totalSlides: number;
  onChange: (id: string, value: string | File) => void;
  onRemove: (id: string) => void;
  onSave: (slide: Slide) => void;
}

export const SlideCard = ({
  slide,
  index,
  onChange,
  onRemove,
  onSave,
}: SlideCardProps) => {
  return (
    <Card className="shadow-[var(--shadow-card)]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Слайд {index + 1}</CardTitle>
            <CardDescription>Изображение для слайдера</CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(slide._id || `temp-${index}`)}
              className="text-destructive hover:bg-destructive/10">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <SlideInput
          image={slide.url}
          onChange={(value) => onChange(slide._id || `temp-${index}`, value)}
        />

        <Button className="w-full gap-2" onClick={() => onSave(slide)}>
          <Save className="w-4 h-4" />
          Сохранить
        </Button>
      </CardContent>
    </Card>
  );
};
