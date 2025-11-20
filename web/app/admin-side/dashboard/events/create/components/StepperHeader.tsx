"use client";

import { Button } from "@/ui/button";

interface StepperHeaderProps {
  step: number;
  setStep: (step: number) => void;
  selectedHall: string;
}

export default function StepperHeader({
  step,
  setStep,
  selectedHall,
}: StepperHeaderProps) {
  return (
    <div className="flex justify-between mb-6">
      <Button
        variant={step === 1 ? "default" : "outline"}
        onClick={() => setStep(1)}>
        1. Информация
      </Button>
      <Button
        variant={step === 2 ? "default" : "outline"}
        onClick={() => setStep(2)}
        disabled={!selectedHall}>
        2. Схема зала
      </Button>
    </div>
  );
}
