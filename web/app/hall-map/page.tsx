"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Calendar } from "@/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Button } from "@/ui/button";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { Label } from "@/ui/label";
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const events = {
  "2025-11-05": {
    id: "event-1",
    title: "Джазовый вечер",
    date: "5 ноября 2025",
    timeStart: "19:00",
    timeEnd: "23:00",
    artists: ["Джон Смит", "Мария Иванова", "Александр Петров"],
    depositPerPerson: 15000,
  },
  "2025-11-10": {
    id: "event-2",
    title: "Классическая музыка",
    date: "10 ноября 2025",
    timeStart: "20:00",
    timeEnd: "22:30",
    artists: ["Симфонический оркестр", "Анна Сергеева"],
    depositPerPerson: 20000,
  },
  "2025-11-15": {
    id: "event-3",
    title: "Караоке вечер",
    date: "15 ноября 2025",
    timeStart: "18:00",
    timeEnd: "00:00",
    artists: ["DJ Максим", "Ведущий Артем"],
    depositPerPerson: 12000,
  },
  "2025-11-20": {
    id: "event-4",
    title: "Рок концерт",
    date: "20 ноября 2025",
    timeStart: "21:00",
    timeEnd: "02:00",
    artists: ["Группа 'Ветер'", "Группа 'Огонь'"],
    depositPerPerson: 18000,
  },
  "2025-11-25": {
    id: "event-5",
    title: "Электронная музыка",
    date: "25 ноября 2025",
    timeStart: "22:00",
    timeEnd: "04:00",
    artists: ["DJ Alex", "DJ Marina"],
    depositPerPerson: 16000,
  },
};

export default function EventPage() {
  const params = useParams<{ name: string }>();
  const hallId = params?.name;

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [bookingType, setBookingType] = useState<"regular" | "event">(
    "regular"
  );

  const eventDates = [
    new Date(2025, 10, 5),
    new Date(2025, 10, 10),
    new Date(2025, 10, 15),
    new Date(2025, 10, 20),
    new Date(2025, 10, 25),
  ];

  const selectedDateStr = selectedDate
    ? format(selectedDate, "yyyy-MM-dd")
    : null;
  const selectedEvent = selectedDateStr
    ? events[selectedDateStr as keyof typeof events]
    : null;

  const isEventDate = (date: Date) =>
    eventDates.some((d) => d.toDateString() === date.toDateString());

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) return true;
    if (bookingType === "event") return !isEventDate(date);
    return isEventDate(date);
  };

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center animate-fade-in">
          Бронирование столика
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-8 animate-fade-in">
          Выберите тип бронирования и дату
        </p>

        {/* Booking Type */}
        <Card className="mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle>Тип бронирования</CardTitle>
            <CardDescription>
              Выберите, хотите ли вы забронировать на обычный день или
              мероприятие
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={bookingType}
              onValueChange={(value) => {
                setBookingType(value as "regular" | "event");
                setSelectedDate(undefined);
              }}>
              <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                <RadioGroupItem value="regular" id="regular" />
                <Label htmlFor="regular" className="flex-1 cursor-pointer">
                  <div className="font-semibold">Обычный день</div>
                  <div className="text-sm text-muted-foreground">
                    Забронировать столик на любой доступный день
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer mt-2">
                <RadioGroupItem value="event" id="event" />
                <Label htmlFor="event" className="flex-1 cursor-pointer">
                  <div className="font-semibold">Мероприятие</div>
                  <div className="text-sm text-muted-foreground">
                    Забронировать на специальное мероприятие (5 дат в ноябре)
                  </div>
                </Label>
              </div>
            </RadioGroup>
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
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle>{selectedEvent.title}</CardTitle>
                <CardDescription>{selectedEvent.date}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon size={16} className="text-primary" />
                  <span>{selectedEvent.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-primary" />
                  <span>
                    {selectedEvent.timeStart} - {selectedEvent.timeEnd}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Users size={16} className="text-primary" />
                    <span>Артисты:</span>
                  </div>
                  <ul className="ml-6 list-disc text-sm text-muted-foreground">
                    {selectedEvent.artists.map((artist, index) => (
                      <li key={index}>{artist}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-2 text-sm pt-4 border-t">
                  <DollarSign size={16} className="text-primary" />
                  <span className="font-semibold">
                    Депозит: {selectedEvent.depositPerPerson.toLocaleString()}{" "}
                    AMD на человека
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/hall-map/${hallId}/${selectedEvent.id}?eventDeposit=${selectedEvent.depositPerPerson}`}
                  className="w-full">
                  <Button className="w-full group">
                    Выбрать столик
                    <ArrowRight
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                      size={16}
                    />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ) : bookingType === "regular" && selectedDate ? (
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle>Обычное бронирование</CardTitle>
                <CardDescription>
                  {format(selectedDate, "d MMMM yyyy", { locale: ru })}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon size={16} className="text-primary" />
                  <span>
                    {format(selectedDate, "d MMMM yyyy", { locale: ru })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Вы выбрали обычное бронирование. Продолжите, чтобы выбрать
                  столик и указать количество гостей.
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/hall-map/${hallId}/regular-day`}
                  className="w-full">
                  <Button className="w-full group">
                    Выбрать столик
                    <ArrowRight
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                      size={16}
                    />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ) : (
            <Card className="animate-fade-in">
              <CardContent className="flex items-center justify-center h-full min-h-[400px]">
                <p className="text-muted-foreground text-center">
                  {bookingType === "event"
                    ? "Выберите дату в календаре,\nчтобы увидеть информацию о мероприятии"
                    : "Выберите дату в календаре\nдля бронирования"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
