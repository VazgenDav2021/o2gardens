import { Wine, Coffee, Cake, ConciergeBell } from "lucide-react";
import { AbstractIntlMessages } from "next-intl";
import { getTranslations } from "next-intl/server";

interface ServicesSectionProps {
  messages: AbstractIntlMessages;
}

const ServicesSection = async ({ messages }: ServicesSectionProps) => {
  const t = await getTranslations(messages);

  const servicesData = t.raw("home.services.LIST") as {
    TITLE: string;
    DESCRIPTION: string;
  }[];

  const icons = [Wine, Coffee, Cake, ConciergeBell];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t("home.services.TITLE")}
        </h2>
        <p className="text-muted-foreground mb-12">
          {t("home.services.DESCRIPTION")}
        </p>
        <div className="grid md:grid-cols-4 gap-8">
          {servicesData.map((service, idx) => {
            const Icon = icons[idx];
            return (
              <div
                key={idx}
                className="p-6 rounded-lg border border-border bg-card hover:border-primary hover:shadow-xl transition-all duration-500 group">
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary/10 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={28} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.TITLE}</h3>
                <p className="text-muted-foreground">{service.DESCRIPTION}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
