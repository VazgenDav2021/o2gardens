"use client";

import { CalendarDays, Music, Utensils } from "lucide-react";

const events = [
  {
    icon: CalendarDays,
    title: "Свадьбы и торжества",
    description: "Организация и проведение свадеб, юбилеев, банкетов",
  },
  {
    icon: Music,
    title: "Живая музыка",
    description: "Регулярные концерты и выступления местных артистов",
  },
  {
    icon: Utensils,
    title: "Авторская кухня",
    description: "Блюда от шеф-повара с уникальной подачей",
  },
];

const EventsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Наши мероприятия
        </h2>
        <p className="text-muted-foreground mb-12">
          Мы создаем атмосферу праздника каждый день
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="p-8 rounded-lg border border-border bg-card hover:border-primary hover:shadow-xl transition-all duration-500 group">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 flex items-center justify-center rounded-full group-hover:scale-110 transition-transform duration-300">
                <event.icon size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-muted-foreground">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
