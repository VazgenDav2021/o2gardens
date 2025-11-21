"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface FormNavigationProps {
  currentStep: number;
  bookingType: string;
  onBack: () => void;
  onNext: () => void;
}

export default function FormNavigation({
  currentStep,
  bookingType,
  onBack,
  onNext,
}: FormNavigationProps) {
  const t = useTranslations("common.halls");

  return (
    <div className="flex gap-4 mt-8">
      {currentStep > 1 && (
        <button
          type="button"
          className="flex-1 h-12 border rounded-md"
          onClick={onBack}>
          <span className="mr-2">◀</span> {t("BACK")}
        </button>
      )}

      {currentStep < 4 ? (
        <button
          type="button"
          onClick={onNext}
          className="flex-1 h-12 bg-primary text-white rounded-md">
          {t("NEXT")} <span className="ml-2">▶</span>
        </button>
      ) : bookingType === "event" ? (
        <button
          type="submit"
          className="flex-1 h-12 bg-primary text-white rounded-md">
          {t("CONFIRM_BOOKING")}
        </button>
      ) : (
        <button
          type="submit"
          className="flex-1 h-12 bg-primary text-white rounded-md">
          Подтвердить
        </button>
      )}
    </div>
  );
}
