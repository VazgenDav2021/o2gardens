"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reservationSchema } from "@/types";
import { useToast } from "@/hooks/use-toast";
import Step1Details from "./Step1Details";
import Step2Contacts from "./Step2Contacts";
import Step3Menu from "./Step3Menu";
import Step4Confirmation from "./Step4Confirmation";
import Stepper from "./Stepper";
import { useTranslations } from "next-intl";

interface ReservationFormProps {
  tableId: string;
  eventDeposit: string | null;
  eventDate: string | null;
  eventTimeStart: string | null;
}

export default function ReservationForm({
  tableId,
  eventDeposit,
  eventDate,
  eventTimeStart,
}: ReservationFormProps) {
  const { toast } = useToast();
  const bookingType = eventDeposit ? "event" : "regular";
  const depositPerPerson = eventDeposit ? parseInt(eventDeposit) : 15000;
  const t = useTranslations("common.halls");
  const te = useTranslations("common.errors");

  const methods = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      adults: 1,
      children4to10: 0,
      childrenUnder4: 0,
      date: eventDate || "",
      time: "",
      menu: [] as string[],
    },
    resolver: zodResolver(reservationSchema),
    mode: "onSubmit",
  });

  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (eventDate) {
      methods.setValue("date", eventDate);
    }
  }, [eventDate]);

  const calculateTotal = () => {
    const adultsTotal = Number(methods.getValues("adults")) * depositPerPerson;
    const children4to10Total =
      Number(methods.getValues("children4to10")) * (depositPerPerson * 0.5);
    return adultsTotal + children4to10Total;
  };

  const totalGuests =
    Number(methods.getValues("adults")) +
    Number(methods.getValues("children4to10")) +
    Number(methods.getValues("childrenUnder4"));

  const handleNext = () => {
    if (currentStep === 1) {
      const { adults, date, time } = methods.getValues();
      if (!adults || !date || !time) {
        toast({
          title: te("FILL_ALL_FIELDS"),
          description: te("MISSING_DATE_TIME_GUESTS"),
          variant: "destructive",
        });
        return;
      }
    }

    if (currentStep === 2) {
      const { name, phone, email } = methods.getValues();
      if (!name || !phone || !email) {
        toast({
          title: te("FILL_ALL_FIELDS"),
          description: te("MISSING_CONTACT_INFO"),
          variant: "destructive",
        });
        return;
      }
    }

    if (currentStep < 4) setCurrentStep((s) => s + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const onSubmit = (data: any) => {
    try {
      reservationSchema.parse(data);
      toast({
        title: te("SUCCESS_TITLE"),
        description:
          bookingType === "event"
            ? te("SUCCESS_EVENT", { amount: calculateTotal() })
            : te("SUCCESS_REGULAR"),
      });
    } catch {
      toast({
        title: te("VALIDATION_ERROR_TITLE"),
        description: te("VALIDATION_ERROR_DESC"),
        variant: "destructive",
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stepper currentStep={currentStep} />

        {currentStep === 1 && (
          <Step1Details
            bookingType={bookingType}
            depositPerPerson={depositPerPerson}
            eventTimeStart={eventTimeStart}
          />
        )}

        {currentStep === 2 && <Step2Contacts />}

        {currentStep === 3 && (
          <Step3Menu currentMenu={{}} onSelectionChange={() => {}} />
        )}

        {currentStep === 4 && (
          <Step4Confirmation
            formData={methods.getValues()}
            bookingType={bookingType}
            tableId={tableId}
            totalAmount={calculateTotal()}
            totalGuests={totalGuests}
          />
        )}

        <div className="flex gap-4 mt-8">
          {currentStep > 1 && (
            <button
              type="button"
              className="flex-1 h-12 border rounded-md"
              onClick={handleBack}>
              <span className="mr-2">◀</span> {t("BACK")}
            </button>
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
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
      </form>
    </FormProvider>
  );
}
