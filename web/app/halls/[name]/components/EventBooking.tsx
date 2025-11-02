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
import { EventType } from "@/types";

interface EventBookingProps {
  allEvents: EventType[];
  hallId: string;
}

export default function EventBooking({ allEvents, hallId }: EventBookingProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [bookingType, setBookingType] = useState<"regular" | "event">(
    "regular"
  );

  const eventDates = allEvents.map((e) => new Date(e.dateISO));
  const selectedDateStr = selectedDate
    ? format(selectedDate, "yyyy-MM-dd")
    : null;
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
          <CardTitle>Тип бронирования</CardTitle>
          <CardDescription>
            Выберите, хотите ли вы забронировать на обычный день или мероприятие
          </CardDescription>
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
            <CardTitle>Календарь</CardTitle>
            <CardDescription>
              {bookingType === "event"
                ? "Выберите дату с мероприятием"
                : "Выберите любую доступную дату"}
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
                  ? "Выберите дату в календаре,\nчтобы увидеть информацию о мероприятии"
                  : "Выберите дату в календаре\nдля бронирования"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
