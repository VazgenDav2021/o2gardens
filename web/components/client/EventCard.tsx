"use client";

import { Card, CardContent } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { MapPin, Users, Music } from "lucide-react";
import Link from "next/link";
import { EventType } from "@/types";
import { useTranslations } from "next-intl";

interface EventCardProps {
  event: EventType;
}

export const EventCard = ({ event }: EventCardProps) => {
  const t = useTranslations("events");
  return (
    <Card className="overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
      <div className="grid md:grid-cols-2">
        <div className="relative h-64 md:h-full overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <CardContent className="p-6 space-y-4">
          <h3 className="text-2xl font-semibold">{event.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {event.description}
          </p>

          <div className="space-y-2 pt-2">
            <InfoItem icon={<MapPin size={16} />} text={event.hall} />
            <InfoItem
              icon={<Users size={16} />}
              text={`До ${event.capacity} человек`}
            />
            <InfoItem
              icon={<Music size={16} />}
              text={event.artists.join(", ")}
            />
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">
              {t("DEPOSIT")}:
            </p>
            <p className="text-2xl font-bold text-primary">
              {event.deposit.toLocaleString()} AMD
            </p>
          </div>

          <Button asChild className="w-full">
            <Link
              href={`/hall-map/${event.hallId}/${event.id}?eventDeposit=${event.deposit}&eventDate=${event.dateISO}&eventTimeStart=${event.timeStart}`}>
              {t("BOOK")}
            </Link>
          </Button>
        </CardContent>
      </div>
    </Card>
  );
};

const InfoItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-2 text-muted-foreground text-sm">
    <span className="text-primary">{icon}</span>
    <span>{text}</span>
  </div>
);
