import { SectionProps } from "@/types";
import { Calendar as CalendarIcon, MapPin, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

const icons = [CalendarIcon, MapPin, Users];

const WhyUsSection = async ({ messages }: SectionProps) => {
  const t = await getTranslations(messages);
  const items = t.raw("home.whyUs.ITEMS") as Array<{
    TITLE: string;
    DESCRIPTION: string;
  }>;

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {t("home.whyUs.TITLE")}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, idx) => {
            const Icon = icons[idx];
            return (
              <div
                key={idx}
                className="p-6 rounded-lg bg-card border border-border hover:border-primary transition-all hover:shadow-2xl hover:shadow-primary/20 group hover:-translate-y-2 duration-500 cursor-pointer">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-125 transition-all duration-500">
                  <Icon className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.TITLE}</h3>
                <p className="text-muted-foreground">{item.DESCRIPTION}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
