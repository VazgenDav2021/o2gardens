"use client";

import React from "react";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

interface StepperProps {
  currentStep: number;
}

export default function Stepper({ currentStep }: StepperProps) {
  const t = useTranslations("common");
  const steps = t.raw("stepper") as Record<string, string>;

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted -translate-y-1/2 -z-10" />
        {Object.values(steps).map((step, idx) => {
          const isCompleted = currentStep > idx + 1;
          const isCurrent = currentStep === idx + 1;
          return (
            <div key={idx + 1} className="flex flex-col items-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                  isCompleted ? "bg-primary text-white" : ""
                } ${
                  isCurrent
                    ? "ring-4 ring-primary/30 bg-primary text-white"
                    : "bg-muted"
                }`}>
                {isCompleted ? <Check size={24} /> : idx + 1}
              </div>
              <span
                className={`text-sm font-medium ${
                  isCurrent ? "text-primary" : "text-muted-foreground"
                }`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
