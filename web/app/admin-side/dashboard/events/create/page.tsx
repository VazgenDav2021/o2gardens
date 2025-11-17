"use client";

import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Event, EventService } from "@/lib/eventService";
import { EventForm } from "./components/EventForm";
import { EventsList } from "./components/EventsList";
import { TableType } from "@/types";

const tables: TableType[] = [
  { _id: "t1", x: 50, y: 50, name: "Стол 1", capacity: 2, status: "available" },
  {
    _id: "t2",
    x: 150,
    y: 50,
    name: "Стол 2",
    capacity: 4,
    status: "available",
  },
  { _id: "t3", x: 250, y: 50, name: "Стол 3", capacity: 6, status: "reserved" },
];

const trees = [
  { _id: "tree1", x: 100, y: 200 },
  { _id: "tree2", x: 300, y: 300 },
];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await EventService.getAll();
        setEvents(data);
      } catch {
        toast({ title: "Ошибка при загрузке событий" });
      }
    };
    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await EventService.delete(id);
      setEvents(events.filter((e) => e._id !== id));
      toast({ title: "Событие удалено" });
    } catch {
      toast({ title: "Ошибка при удалении события" });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <EventForm onSave={(newEvent) => setEvents([...events, newEvent])} />
      <EventsList events={events} onDelete={handleDelete} />
    </div>
  );
}
