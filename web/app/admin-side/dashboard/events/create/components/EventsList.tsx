"use client";

import { Event } from "@/lib/eventService";
import { EventCard } from "./EventCard";

interface EventsListProps {
  events: Event[];
  onDelete: (id: string) => void;
}

export function EventsList({ events, onDelete }: EventsListProps) {
  return (
    <div className="grid gap-4">
      {events.map((event) => (
        <EventCard key={event._id} event={event} onDelete={onDelete} />
      ))}
    </div>
  );
}
