"use client";

import { useState, useRef } from "react";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/ui/button";
import { SlideCard } from "./SlideCard";
import { Slide } from "@/types";
import {
  createSlide,
  deleteSlide,
  updateSlide,
} from "@/services/slideService";

interface HeroContentFormProps {
  slides: Slide[];
}

interface SlideWithFile extends Slide {
  _file?: File;
}

const HeroContentForm = ({ slides: initialSlides }: HeroContentFormProps) => {
  const { toast } = useToast();
  const [slides, setSlides] = useState<SlideWithFile[]>(initialSlides);
  const fileMapRef = useRef<Map<string, File>>(new Map());

  const addSlide = () => {
    const newSlide: SlideWithFile = { url: "", order: slides.length };
    setSlides((prev) => [...prev, newSlide]);
  };

  const updateSlideLocal = (id: string, value: string | File) => {
    setSlides((prev) =>
      prev.map((s, index) => {
        const slideId = s._id || `temp-${index}`;
        if (slideId === id) {
          if (value instanceof File) {
            fileMapRef.current.set(slideId, value);
            const previewUrl = URL.createObjectURL(value);
            return {
              ...s,
              url: previewUrl,
              _file: value,
            };
          } else {
            fileMapRef.current.delete(slideId);
            return {
              ...s,
              url: value,
              _file: undefined,
            };
          }
        }
        return s;
      })
    );
  };

  const removeSlide = async (id: string) => {
    try {
      if (id.startsWith("temp-")) {
        const index = parseInt(id.replace("temp-", ""));
        const slideToRemove = slides[index];

        if (slideToRemove?.url.startsWith("blob:")) {
          URL.revokeObjectURL(slideToRemove.url);
        }
        fileMapRef.current.delete(id);

        setSlides((prev) => prev.filter((_, i) => i !== index));
        toast({ title: "Удалено", description: "Слайд успешно удалён." });
        return;
      }

      await deleteSlide(id);

      const slideToRemove = slides.find((s) => s._id === id);
      if (slideToRemove?.url.startsWith("blob:")) {
        URL.revokeObjectURL(slideToRemove.url);
      }
      fileMapRef.current.delete(id);

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

  const saveSlide = async (slide: SlideWithFile) => {
    try {
      const slideIndex = slides.findIndex((s) => {
        if (slide._id) {
          return s._id === slide._id;
        }
        return s === slide;
      });
      const slideId =
        slide._id ||
        (slideIndex >= 0 ? `temp-${slideIndex}` : `temp-${slides.length}`);
      const file = fileMapRef.current.get(slideId) || slide._file;

      let saved: Slide;

      if (!slide._id) {
        if (file instanceof File) {
          const response = await createSlide(
            file,
            slide.order ?? slides.length
          );
          saved = response.data;
        } else if (slide.url && !slide.url.startsWith("blob:")) {
          const response = await createSlide(
            slide.url,
            slide.order ?? slides.length
          );
          saved = response.data;
        } else {
          throw new Error("Please provide an image file or URL");
        }

        fileMapRef.current.delete(slideId);
        if (slide.url.startsWith("blob:")) {
          URL.revokeObjectURL(slide.url);
        }

        setSlides((prev) => prev.map((s) => (s === slide ? saved : s)));
      } else {
        if (file instanceof File) {
          const response = await updateSlide(slide._id, file, slide.order);
          saved = response.data;
        } else if (slide.url && !slide.url.startsWith("blob:")) {
          const response = await updateSlide(slide._id, slide.url, slide.order);
          saved = response.data;
        } else {
          const response = await updateSlide(slide._id, undefined, slide.order);
          saved = response.data;
        }

        fileMapRef.current.delete(slideId);
        if (slide.url.startsWith("blob:")) {
          URL.revokeObjectURL(slide.url);
        }

        setSlides((prev) => prev.map((s) => (s._id === slide._id ? saved : s)));
      }

      toast({
        title: "Сохранено",
        description: "Слайд успешно сохранён.",
      });
    } catch (e: any) {
      toast({
        title: "Ошибка",
        description: e?.message || "Не удалось сохранить слайд.",
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
