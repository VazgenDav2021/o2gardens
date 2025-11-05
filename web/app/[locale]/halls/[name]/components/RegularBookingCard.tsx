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
import { useTranslations } from "next-intl";

interface RegularBookingCardProps {
  hallId: string;
  selectedDate: Date;
}

export const RegularBookingCard = ({
  hallId,
  selectedDate,
}: RegularBookingCardProps) => {
  const t = useTranslations("common.regularBooking");

  return (
    <Card className="animate-scale-in">
      <CardHeader>
        <CardTitle>{t("TITLE")}</CardTitle>
        <CardDescription>
          {format(selectedDate, "d MMMM yyyy", { locale: ru })}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <CalendarIcon size={16} className="text-primary" />
          <span>{format(selectedDate, "d MMMM yyyy", { locale: ru })}</span>
        </div>
        <p className="text-sm text-muted-foreground">{t("DESCRIPTION")}</p>
      </CardContent>
      <CardFooter>
        <Link
          href={`/hall-map/${hallId}/regular-day?eventDate=${format(selectedDate, "yyyy-MM-dd", { locale: ru })}`}
          className="w-full">
          <Button className="w-full group">{t("BUTTON")}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
