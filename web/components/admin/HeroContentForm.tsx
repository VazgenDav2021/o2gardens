"use client";

import { useState, useRef } from "react";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/ui/button";
import { SlideCard } from "./SlideCard";
import { Slide } from "@/types";
import { createSlide, deleteSlide, updateSlide } from "@/services/slideService";

interface HeroContentFormProps {
  slides: Slide[];
}

interface SlideWithFile extends Slide {
  _file?: File;
  preview?: string; // local blob preview
}

const HeroContentForm = ({ slides: initial }: HeroContentFormProps) => {
  const { toast } = useToast();

  const [slides, setSlides] = useState<SlideWithFile[]>(
    initial.map((s) => ({ ...s, preview: s.url }))
  );

  const addSlide = () => {
    setSlides((prev) => [
      ...prev,
      {
        _file: undefined,
        preview: "",
        order: prev.length,
        url: "", // Provide the required property for SlideWithFile type
      },
    ]);
  };

  const updateSlideLocal = (id: string, file: File) => {
    setSlides((prev) =>
      prev.map((s, index) => {
        const slideId = s._id ?? `temp-${index}`;
        if (slideId === id) {
          const previewUrl = URL.createObjectURL(file);
          return {
            ...s,
            _file: file,
            preview: previewUrl,
            
          };
        }
        return s;
      })
    );
  };

  const removeSlide = async (id: string) => {
    try {
      // local slide (not saved yet)
      if (id.startsWith("temp-")) {
        const index = Number(id.replace("temp-", ""));
        const slide = slides[index];
        if (slide.preview?.startsWith("blob:")) {
          URL.revokeObjectURL(slide.preview);
        }
        setSlides((prev) => prev.filter((_, i) => i !== index));
        toast({ title: "Удалено", description: "Слайд удалён." });
        return;
      }

      // saved slide
      await deleteSlide(id);

      const slide = slides.find((s) => s._id === id);
      if (slide?.preview?.startsWith("blob:")) {
        URL.revokeObjectURL(slide.preview);
      }

      setSlides((prev) => prev.filter((s) => s._id !== id));
      toast({ title: "Удалено", description: "Слайд удалён." });
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить слайд.",
        variant: "destructive",
      });
    }
  };

  const saveSlide = async (slide: SlideWithFile) => {
    try {
      if (!slide._file) throw new Error("Выберите файл!");

      let saved: Slide;

      if (!slide._id) {
        // create
        const response = await createSlide(slide._file, slide.order);
        saved = response.data;
      } else {
        // update
        const response = await updateSlide(slide._id, slide._file, slide.order);
        saved = response.data;
      }

      // cleanup previews
      if (slide.preview?.startsWith("blob:")) {
        URL.revokeObjectURL(slide.preview);
      }

      setSlides((prev) =>
        prev.map((s) => (s === slide ? { ...saved, preview: saved.url } : s))
      );

      toast({
        title: "Сохранено",
        description: "Слайд успешно сохранён.",
      });
    } catch (e: any) {
      toast({
        title: "Ошибка",
        description: e?.message ?? "Не удалось сохранить слайд.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold">Контент главной страницы</h2>
      <p className="text-muted-foreground">Управление изображениями слайдера</p>

      {slides.map((slide, i) => (
        <SlideCard
          key={slide._id ?? `temp-${i}`}
          slide={slide}
          index={i}
          totalSlides={slides.length}
          onChange={(id, value) => updateSlideLocal(id, value as File)}
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
