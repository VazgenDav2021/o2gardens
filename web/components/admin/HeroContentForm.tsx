"use client";

import { useState } from "react";
import { Save, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";

const HeroContentForm = () => {
  const { toast } = useToast();
  const [slides, setSlides] = useState([{ id: 1, image: "" }]);

  const addSlide = () => {
    setSlides([...slides, { id: slides.length + 1, image: "" }]);
  };

  const removeSlide = (id: number) => {
    setSlides(slides.filter((slide) => slide.id !== id));
  };

  const handleSave = () => {
    toast({
      title: "Сохранено",
      description: "Контент главной страницы успешно сохранен.",
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Контент главной страницы</h2>
          <p className="text-muted-foreground mt-1">
            Управление изображениями слайдера
          </p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          Сохранить все
        </Button>
      </div>

      {slides.map((slide, index) => (
        <Card key={slide.id} className="shadow-[var(--shadow-card)]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Слайд {index + 1}</CardTitle>
                <CardDescription>Изображение для слайдера</CardDescription>
              </div>
              {slides.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSlide(slide.id)}
                  className="text-destructive hover:bg-destructive/10">
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Изображение слайда</Label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="URL изображения"
                  value={slide.image}
                  onChange={(e) => {
                    const newSlides = [...slides];
                    newSlides[index].image = e.target.value;
                    setSlides(newSlides);
                  }}
                />
                <Button variant="outline" className="gap-2">
                  <Upload className="w-4 h-4" />
                  Загрузить
                </Button>
              </div>
              {slide.image && (
                <img
                  src={slide.image}
                  alt="Preview"
                  className="mt-2 w-full h-48 object-cover rounded-lg"
                />
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={addSlide} variant="outline" className="w-full">
        Добавить слайд
      </Button>
    </div>
  );
};

export default HeroContentForm;
