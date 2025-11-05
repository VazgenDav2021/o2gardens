import { Card, CardContent } from "@/ui/card";
import { AbstractIntlMessages } from "next-intl";
import { getTranslations } from "next-intl/server";

interface AboutPageProps {
  messages: AbstractIntlMessages;
}

const AboutPage = async ({ messages }: AboutPageProps) => {
  const t = await getTranslations({messages, namespace: "about" });
  const advantages = t.raw("advantages.LIST") as string[];

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center animate-fade-in">
          {t("TITLE")}
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-12 animate-fade-in">
          {t("DESCRIPTION")}
        </p>

        <div className="space-y-8">
          <Card className="animate-fade-in">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">
                {t("history.TITLE")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("history.TEXT")}
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">
                {t("advantages.TITLE")}
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                {advantages.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">
                {t("mission.TITLE")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("mission.TEXT")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
