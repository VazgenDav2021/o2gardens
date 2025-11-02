"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/ui/card";
import { Button } from "@/ui/button";
import Link from "next/link";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface RegularBookingCardProps {
  hallId: string;
  selectedDate: Date;
}

export const RegularBookingCard = ({
  hallId,
  selectedDate,
}: RegularBookingCardProps) => (
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
        <span>{format(selectedDate, "d MMMM yyyy", { locale: ru })}</span>
      </div>
      <p className="text-sm text-muted-foreground">
        Вы выбрали обычное бронирование. Продолжите, чтобы выбрать столик и
        указать количество гостей.
      </p>
    </CardContent>
    <CardFooter>
      <Link href={`/hall-map/${hallId}/regular-day`} className="w-full">
        <Button className="w-full group">Выбрать столик</Button>
      </Link>
    </CardFooter>
  </Card>
);
