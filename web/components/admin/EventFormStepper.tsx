"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import StepperHeader from "./StepperHeader";
import EventInfoStep from "./EventInfoStep";
import HallStep from "./HallStep";
import { Event } from "@/types";
import { DEFAULT_EVENT_VALUES } from "@/constants";
import { createEvent } from "@/services";

export default function EventFormStepper() {
  const [step, setStep] = useState(1);

  const { register, control, handleSubmit, setValue, watch } = useForm<Event>({
    defaultValues: DEFAULT_EVENT_VALUES,
  });

  const selectedHall = watch("hall");

  console.log(watch());

  const onSubmit = async (data: Event) => {
    createEvent({
      ...data,
      date: new Date(data.date).getTime(),
    });
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
