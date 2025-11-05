"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Calendar as CalendarIcon, Clock, Users, Baby } from "lucide-react";
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

export default function Step1Details({
  bookingType,
  depositPerPerson,
  eventTimeStart,
}: Props) {
  const { control, watch } = useFormContext();
  const values = watch();
  const allTimeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return [`${hour}:00`, `${hour}:30`];
  }).flat();
  const timeSlots = eventTimeStart
    ? allTimeSlots.filter((slot) => slot >= eventTimeStart)
    : allTimeSlots;
  const totalGuests =
    Number(values.adults) +
    Number(values.children4to10) +
    Number(values.childrenUnder4);
  const totalAmount =
    Number(values.adults) * depositPerPerson +
    Number(values.children4to10) * depositPerPerson * 0.5;
  const guestOptions = Array.from({ length: 21 }, (_, i) => i);

  const t = useTranslations("common.step1Details");

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">{t("GUESTS_TITLE")}</h2>

      <div className="space-y-4">
        <Label className="text-base font-semibold">{t("GUESTS_TITLE")}</Label>

        <div className="space-y-2">
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

        {bookingType === "event" && (
          <>
            <div className="space-y-2">
              <Label className="text-base flex items-center gap-2">
                <Baby size={18} className="text-primary" /> {t("CHILDREN_4_10")}
              </Label>
              <Controller
                name="children4to10"
                control={control}
                render={({ field }) => (
                  <Select
                    value={String(field.value || 0)}
                    onValueChange={(v) => field.onChange(Number(v))}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue
                        placeholder={t("SELECT_GUESTS_PLACEHOLDER")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {guestOptions.map((num) => (
                        <SelectItem key={num} value={String(num)}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-base flex items-center gap-2">
                <Baby size={18} className="text-primary" />{" "}
                {t("CHILDREN_UNDER_4")}
              </Label>
              <Controller
                name="childrenUnder4"
                control={control}
                render={({ field }) => (
                  <Select
                    value={String(field.value || 0)}
                    onValueChange={(v) => field.onChange(Number(v))}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue
                        placeholder={t("SELECT_GUESTS_PLACEHOLDER")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {guestOptions.map((num) => (
                        <SelectItem key={num} value={String(num)}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
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
                        ? format(selected, "d MMMM yyyy", {
                            locale: ru,
                          })
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

      {bookingType === "event" && (
        <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/5 border-2 border-primary/20 rounded-xl space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">
              {t("DEPOSIT_PER_ADULT")}:
            </span>
            <span className="font-semibold">
              {depositPerPerson.toLocaleString()} AMD
            </span>
          </div>
          {Number(values.children4to10) > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">
                {t("DEPOSIT_CHILD_4_10", { count: values.children4to10 })}
              </span>
              <span className="font-semibold">
                {(
                  Number(values.children4to10) *
                  depositPerPerson *
                  0.5
                ).toLocaleString()}{" "}
                AMD
              </span>
            </div>
          )}
          {Number(values.childrenUnder4) > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">
                {t("DEPOSIT_CHILD_UNDER_4", { count: values.childrenUnder4 })}
              </span>
              <span className="font-semibold">0 AMD</span>
            </div>
          )}
          <div className="pt-3 border-t border-primary/20 flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {t("TOTAL_GUESTS", { count: totalGuests })}
            </span>
            <span className="text-2xl font-bold text-primary">
              {totalAmount.toLocaleString()} AMD
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
