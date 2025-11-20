import { SectionProps } from "@/types";
import { CalendarDays, Music, Utensils } from "lucide-react";
import { getTranslations } from "next-intl/server";

const iconMap = [CalendarDays, Music, Utensils];

const EventsSection = async ({ messages }: SectionProps) => {
  const t = await getTranslations(messages);

  const events = t.raw("home.events.LIST") as Array<{
    ICON: keyof typeof iconMap;
    TITLE: string;
    DESCRIPTION: string;
  }>;

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t("home.events.TITLE")}
        </h2>
        <p className="text-muted-foreground mb-12">
          {t("home.events.DESCRIPTION")}
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, idx) => {
            const Icon = iconMap[idx];
            return (
              <div
                key={idx}
                className="p-8 rounded-lg border border-border bg-card hover:border-primary hover:shadow-xl transition-all duration-500 group">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 flex items-center justify-center rounded-full group-hover:scale-110 transition-transform duration-300">
                  <Icon size={28} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{event.TITLE}</h3>
                <p className="text-muted-foreground">{event.DESCRIPTION}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
