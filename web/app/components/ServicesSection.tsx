"use client";

import { Wine, Coffee, Cake, ConciergeBell } from "lucide-react";

const services = [
  {
    icon: Wine,
    title: "Бар и коктейли",
    desc: "Большой выбор вин и авторских напитков",
  },
  {
    icon: Coffee,
    title: "Кофейня",
    desc: "Ароматный кофе и десерты ручной работы",
  },
  {
    icon: Cake,
    title: "Кейтеринг",
    desc: "Полный спектр услуг для вашего праздника",
  },
  {
    icon: ConciergeBell,
    title: "Сервис",
    desc: "Внимательный персонал и высокий стандарт обслуживания",
  },
];

const ServicesSection = () => (
  <section className="py-20 bg-gradient-to-b from-background to-muted/20">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Наши услуги</h2>
      <p className="text-muted-foreground mb-12">
        Мы предлагаем все, чтобы ваш вечер был идеальным
      </p>
      <div className="grid md:grid-cols-4 gap-8">
        {services.map((service, i) => (
          <div
            key={i}
            className="p-6 rounded-lg border border-border bg-card hover:border-primary hover:shadow-xl transition-all duration-500 group">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary/10 group-hover:scale-110 transition-transform duration-300">
              <service.icon size={28} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-muted-foreground">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
