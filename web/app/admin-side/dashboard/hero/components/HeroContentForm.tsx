"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/ui/button";
import { SlideCard } from "./SlideCard";
import { HeroImage, HeroService } from "@/lib/heroService";

interface HeroContentFormProps {
  slides: HeroImage[];
}

const HeroContentForm = ({ slides: initialSlides }: HeroContentFormProps) => {
  const { toast } = useToast();
  const [slides, setSlides] = useState<HeroImage[]>(initialSlides);

  const addSlide = () => setSlides((prev) => [...prev, { imageUrl: "" }]);

  const updateSlideLocal = (id: string, value: string | File) => {
    setSlides((prev) =>
      prev.map((s) =>
        s._id === id
          ? {
              ...s,
              imageUrl:
                value instanceof File ? URL.createObjectURL(value) : value,
            }
          : s
      )
    );
  };

  const removeSlide = async (id: string) => {
    try {
      await HeroService.delete(id);
      setSlides((prev) => prev.filter((s) => s._id !== id));

      toast({ title: "Удалено", description: "Слайд успешно удалён." });
    } catch (e) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить слайд.",
        variant: "destructive",
      });
    }
  };

  const saveSlide = async (slide: HeroImage) => {
    try {
      let saved: HeroImage;

      if (!slide._id) {
        saved = await HeroService.create(slide);
        setSlides((prev) => prev.map((s) => (s === slide ? { ...saved } : s)));
      } else {
        saved = await HeroService.update(slide._id, slide);
        setSlides((prev) =>
          prev.map((s) => (s._id === slide._id ? { ...saved } : s))
        );
      }

      toast({
        title: "Сохранено",
        description: "Слайд успешно сохранён.",
      });
    } catch (e) {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить слайд.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold">Контент главной страницы</h2>
      <p className="text-muted-foreground">Управление изображениями слайдера</p>

      {slides.map((slide, index) => (
        <SlideCard
          key={slide._id ?? index}
          slide={slide}
          index={index}
          totalSlides={slides.length}
          onChange={updateSlideLocal}
          onRemove={removeSlide}
          onSave={saveSlide}
        />
      ))}

      <Button onClick={addSlide} variant="outline" className="w-full">
        Добавить слайд
      </Button>
    </div>
  );
};

export default HeroContentForm;
