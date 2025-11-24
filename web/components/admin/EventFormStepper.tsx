"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import StepperHeader from "./StepperHeader";
import EventInfoStep from "./EventInfoStep";
import HallStep from "./HallStep";
import { Event } from "@/types";

export default function EventFormStepper() {
  const [step, setStep] = useState(2);

  const { register, control, handleSubmit, setValue, watch } = useForm<Event>({
    defaultValues: {
      name: { ru: "", en: "", hy: "" },
      description: { ru: "", en: "", hy: "" },
      artists: { ru: "", en: "", hy: "" },
      isAdult: false,
      hall: "",
      menu: [],
    },
  });

  const selectedHall = watch("hall");

  const onSubmit = async () => {};

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
