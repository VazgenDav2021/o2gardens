"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import StepperHeader from "./StepperHeader";
import EventInfoStep from "./EventInfoStep";
import HallStep from "./HallStep";
import { Event } from "@/types";
import { DEFAULT_EVENT_VALUES } from "@/constants";
import { createEvent, updateEvent, getEvent } from "@/services";
import { getImageUrl } from "@/lib/getImageUrl";
import { formatDate } from "@/lib/formatDate";

interface EventFormStepperProps {
  eventId?: string;
}

export default function EventFormStepper({ eventId }: EventFormStepperProps) {
  const [step, setStep] = useState(1);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(!!eventId);
  const router = useRouter();
  const { toast } = useToast();

  const isUpdateMode = !!eventId;

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const { register, control, handleSubmit, setValue, watch, reset } =
    useForm<Event>({
      defaultValues: DEFAULT_EVENT_VALUES,
    });

  const selectedHall = watch("hall");

  // Load event data if in update mode
  useEffect(() => {
    if (eventId) {
      loadEventData();
    }
  }, [eventId]);

  const loadEventData = async () => {
    if (!eventId) return;

    try {
      setLoading(true);
      const response = await getEvent<"admin">(eventId);
      const event = response.data;

      // Convert date timestamp to date string for input
      const dateString = event.date
        ? formatDate(new Date(event.date))
        : formatDate(new Date());

      // Ensure schema is properly structured
      const eventData = {
        ...event,
        date: dateString as unknown as number,
        // Ensure schema has tables and scenes arrays even if undefined
        schema: event.schema && typeof event.schema === "object" 
          ? {
              ...event.schema,
              tables: event.schema.tables || [],
              scenes: event.schema.scenes || [],
            }
          : event.schema,
      };

      // Set form values
      reset(eventData);

      if (event.image) {
        setImagePreview(getImageUrl(event.image));
      }
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить событие",
        variant: "destructive",
      });
      router.push("/admin-side/dashboard/events");
    } finally {
      setLoading(false);
    }
  };

  const handleImageFileChange = (file: File | null) => {
    setImageFile(file);
    if (file) {
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
    } else {
      if (imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview("");
    }
  };

  const onSubmit = async (data: Event) => {
    if (!isUpdateMode && !imageFile) {
      toast({
        title: "Ошибка",
        description: "Необходимо выбрать изображение",
        variant: "destructive",
      });
      return;
    }

    // Convert date to timestamp if it's a string (from date input)
    const eventData = {
      ...data,
      date:
        typeof data.date === "string"
          ? new Date(data.date).getTime()
          : data.date,
    };

    try {
      if (isUpdateMode && eventId) {
        await updateEvent(eventId, eventData, imageFile || undefined);
        toast({
          title: "Успешно",
          description: "Событие обновлено",
        });
      } else {
        await createEvent(eventData, imageFile!);
        toast({
          title: "Успешно",
          description: "Событие создано",
        });
      }
      router.push("/admin-side/dashboard/events");
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description:
          error?.response?.data?.message || "Не удалось сохранить событие",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="text-center py-12">Загрузка...</div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-5xl mx-auto">
      <StepperHeader
        step={step}
        setStep={setStep}
        selectedHall={selectedHall}
      />

      {step === 1 && (
        <EventInfoStep
          register={register}
          setValue={setValue}
          watch={watch}
          nextStep={() => setStep(2)}
          control={control}
          onImageFileChange={handleImageFileChange}
          imagePreview={imagePreview}
        />
      )}

      {step === 2 && (
        <HallStep
          selectedHall={selectedHall}
          prevStep={() => setStep(1)}
          setValue={setValue}
          watch={watch}
        />
      )}
    </form>
  );
}
