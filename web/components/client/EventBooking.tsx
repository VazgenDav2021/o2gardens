"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Calendar } from "@/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/ui/card";
import { EventCard } from "@/components/client/EventCard";
import { RegularBookingCard } from "./RegularBookingCard";
import BookingTypeSelector from "./BookingTypeSelector";
import { useTranslations } from "next-intl";
import { formatDate } from "@/lib/formatDate";
import { BookingType, Event } from "@/types";

interface EventBookingProps {
  allEvents: Event<'client'>[];
  hallId: string;
}

export default function EventBooking({ allEvents, hallId }: EventBookingProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [bookingType, setBookingType] = useState<BookingType>("regular");
  const t = useTranslations("common.halls");

  const eventDates = allEvents.map((e) => new Date(e.dateISO));
  const selectedDateStr = selectedDate ? formatDate(selectedDate) : null;
  const selectedEvent = selectedDateStr
    ? allEvents.find((e) => e.dateISO === selectedDateStr)
    : null;

  const isEventDate = (date: Date) =>
    eventDates.some((d) => d.toDateString() === date.toDateString());

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;
    return bookingType === "event" ? !isEventDate(date) : isEventDate(date);
  };

  return (
    <>
      <Card className="mb-8 animate-fade-in">
        <CardHeader>
          <CardTitle>{t("BOOKING_TYPE_TITLE")}</CardTitle>
          <CardDescription>{t("BOOKING_TYPE_DESCRIPTION")}</CardDescription>
        </CardHeader>
        <CardContent>
          <BookingTypeSelector
            bookingType={bookingType}
            onChange={(value) => {
              setBookingType(value);
              setSelectedDate(undefined);
            }}
          />
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>{t("CALENDAR_TITLE")}</CardTitle>
            <CardDescription>
              {bookingType === "event"
                ? t("CALENDAR_DESCRIPTION_EVENT")
                : t("CALENDAR_DESCRIPTION_REGULAR")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={ru}
              disabled={isDateDisabled}
              className="rounded-md border pointer-events-auto"
            />
          </CardContent>
        </Card>

        {bookingType === "event" && selectedEvent ? (
          <EventCard event={selectedEvent} />
        ) : bookingType === "regular" && selectedDate ? (
          <RegularBookingCard hallId={hallId} selectedDate={selectedDate} />
        ) : (
          <Card className="animate-fade-in">
            <CardContent className="flex items-center justify-center h-full min-h-[400px]">
              <p className="text-muted-foreground text-center whitespace-pre-line">
                {bookingType === "event"
                  ? t("NO_EVENT_SELECTED")
                  : t("NO_REGULAR_SELECTED")}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
