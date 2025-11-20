"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import StepperHeader from "./StepperHeader";
import EventInfoStep from "./EventInfoStep";
import HallStep from "./HallStep";

export interface MultilangText {
  ru: string;
  en: string;
  hy: string;
}

export interface MenuItem {
  name: MultilangText;
  description: MultilangText;
  price: string;
  photo: string;
}

export interface EventFormValues {
  title: MultilangText;
  description: MultilangText;
  artists: MultilangText;
  adultsOnly: boolean;
  hall: string;
  menu: MenuItem[];
}

const HALLS = [
  { value: "hall1", label: "Зал 1" },
  { value: "hall2", label: "Зал 2" },
  { value: "hall3", label: "Зал 3" },
];

export default function EventFormStepper() {
  const [step, setStep] = useState(2);

  const { register, control, handleSubmit, setValue, watch } =
    useForm<EventFormValues>({
      defaultValues: {
        title: { ru: "", en: "", hy: "" },
        description: { ru: "", en: "", hy: "" },
        artists: { ru: "", en: "", hy: "" },
        adultsOnly: false,
        hall: "",
        menu: [],
      },
    });

  const selectedHall = watch("hall");

  const onSubmit = (data: EventFormValues) => {
    console.log("FORM:", data);
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
        />
      )}

      {step === 2 && (
        <HallStep selectedHall={selectedHall} prevStep={() => setStep(1)} />
      )}
    </form>
  );
}
