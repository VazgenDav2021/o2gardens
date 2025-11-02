"use client";

import { Check } from "lucide-react";

interface StepperProps {
  currentStep: number;
  setStep: (step: number) => void;
}

const steps = [
  { number: 1, title: "Детали" },
  { number: 2, title: "Контакты" },
  { number: 3, title: "Меню" },
  { number: 4, title: "Подтверждение" },
];

export default function Stepper({ currentStep, setStep }: StepperProps) {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted -translate-y-1/2 -z-10" />
        {steps.map((step) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div
              key={step.number}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setStep(step.number)}>
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-2
                  ${isCompleted ? "bg-primary text-white" : ""}
                  ${
                    isCurrent
                      ? "ring-4 ring-primary/30 bg-primary text-white"
                      : "bg-muted"
                  }
                `}>
                {isCompleted ? <Check size={24} /> : step.number}
              </div>
              <span
                className={`text-sm font-medium ${
                  isCurrent ? "text-primary" : "text-muted-foreground"
                }`}>
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
