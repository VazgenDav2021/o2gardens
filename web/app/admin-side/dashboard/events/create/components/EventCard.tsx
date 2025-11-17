"use client";

import { Button } from "@/ui/button";
import { Trash2 } from "lucide-react";
import { Card, CardContent } from "@/ui/card";
import { Event } from "@/lib/eventService";

interface EventCardProps {
  event: Event;
  onDelete: (id: string) => void;
}

export function EventCard({ event, onDelete }: EventCardProps) {
  return (
    <Card className="shadow-md">
      <CardContent className="pt-6 flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">
            {event.name.ru} / {event.name.hy} / {event.name.en}
          </h3>
          <p className="text-sm text-muted-foreground">{event.hall}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(event._id!)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
