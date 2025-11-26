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
import { ru } from "date-fns/locale";
import { useTranslations } from "next-intl";
import { formatDate } from "@/lib/formatDate";

interface RegularBookingCardProps {
  hall: string;
  selectedDate: Date;
}

export const RegularBookingCard = ({
  hall,
  selectedDate,
}: RegularBookingCardProps) => {
  const t = useTranslations("common.regularBooking");

  return (
    <Card className="animate-scale-in">
      <CardHeader>
        <CardTitle>{t("TITLE")}</CardTitle>
        <CardDescription>{formatDate(selectedDate)}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <CalendarIcon size={16} className="text-primary" />
          <span>{formatDate(selectedDate)}</span>
        </div>
        <p className="text-sm text-muted-foreground">{t("DESCRIPTION")}</p>
      </CardContent>
      <CardFooter>
        <Link
          href={`/hall-map/${hall}/?eventDate=${formatDate(selectedDate)}`}
          className="w-full">
          {/* TODO: Add booking link */}
          {/* <Button className="w-full group">{t("BUTTON")}</Button> */}
        </Link>
      </CardFooter>
    </Card>
  );
};
