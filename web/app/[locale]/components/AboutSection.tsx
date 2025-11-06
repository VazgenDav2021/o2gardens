import { AbstractIntlMessages } from "next-intl";
import { getTranslations } from "next-intl/server";

interface AboutSectionProps {
  messages: AbstractIntlMessages;
}

const AboutSection = async ({ messages }: AboutSectionProps) => {
  const t = await getTranslations({ messages });

  const paragraphs = t.raw("home.about.PARAGRAPHS") as string[];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <img
          src="/hero-image.png"
          alt={t("home.about.TITLE")}
          className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
        />
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("home.about.TITLE")}
          </h2>
          {paragraphs.map((text, idx) => (
            <p key={idx} className="text-muted-foreground mb-4">
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
