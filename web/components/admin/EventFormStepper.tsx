"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import StepperHeader from "./StepperHeader";
import EventInfoStep from "./EventInfoStep";
import HallStep from "./HallStep";
import { Event } from "@/types";
import { DEFAULT_EVENT_VALUES } from "@/constants";
import { createEvent } from "@/services";

export default function EventFormStepper() {
  const [step, setStep] = useState(1);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const { register, control, handleSubmit, setValue, watch } = useForm<Event>({
    defaultValues: DEFAULT_EVENT_VALUES,
  });

  const selectedHall = watch("hall");

  console.log(watch());

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
    if (!imageFile) {
      // You might want to show an error toast here
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

    await createEvent(eventData, imageFile);
  };

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
