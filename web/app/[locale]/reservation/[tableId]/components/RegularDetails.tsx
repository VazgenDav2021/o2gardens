"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Calendar as CalendarIcon, Clock, Users } from "lucide-react";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import { Calendar } from "@/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/ui/select";
import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";

interface Props {
  bookingType: string;
  depositPerPerson: number;
  eventTimeStart: string | null;
}

export default function RegularDetails({ eventTimeStart }: Props) {
  const { control, watch } = useFormContext();
  const values = watch();
  const allTimeSlots = Array.from({ length: 24 }, (_, i) => [
    `${i.toString().padStart(2, "0")}:00`,
    `${i.toString().padStart(2, "0")}:30`,
  ]).flat();
  const timeSlots = eventTimeStart
    ? allTimeSlots.filter((slot) => slot >= eventTimeStart)
    : allTimeSlots;

  const t = useTranslations("common.step1Details");
  const guestOptions = Array.from({ length: 21 }, (_, i) => i);

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">{t("GUESTS_TITLE")}</h2>

      {/* Guests */}
      <div className="space-y-4">
        <Label className="text-base flex items-center gap-2">
          <Users size={18} className="text-primary" /> {t("ADULTS")}
        </Label>
        <Controller
          name="adults"
          control={control}
          render={({ field }) => (
            <Select
              value={String(field.value || 0)}
              onValueChange={(v) => field.onChange(Number(v))}>
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder={t("SELECT_GUESTS_PLACEHOLDER")} />
              </SelectTrigger>
              <SelectContent>
                {guestOptions.slice(1).map((num) => (
                  <SelectItem key={num} value={String(num)}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Date and time */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Date */}
        <div className="space-y-2">
          <Label className="text-base flex items-center gap-2">
            <CalendarIcon size={18} className="text-primary" /> {t("DATE")}
          </Label>
          <Controller
            name="date"
            control={control}
            render={({ field }) => {
              const selected = field.value ? new Date(field.value) : undefined;
              return (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-12 w-full justify-start text-left text-base font-normal",
                        !selected && "text-muted-foreground"
                      )}>
                      {selected
                        ? format(selected, "d MMMM yyyy", { locale: ru })
                        : t("SELECT_DATE_PLACEHOLDER")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selected}
                      onSelect={(date) =>
                        field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                      }
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      initialFocus
                      locale={ru}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              );
            }}
          />
        </div>

        {/* Time */}
        <div className="space-y-2">
          <Label className="text-base flex items-center gap-2">
            <Clock size={18} className="text-primary" /> {t("TIME")}
          </Label>
          <Controller
            name="time"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value || ""}
                onValueChange={(v) => field.onChange(v)}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder={t("SELECT_TIME_PLACEHOLDER")} />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
    </div>
  );
}
