import { ContactForm } from "@/components/client/ContactForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/ui/card";
import { getMessages, getTranslations } from "next-intl/server";
import { MapPin, Phone, Mail } from "lucide-react";
import { Locale } from "@/types";

interface ContactPageProps {
  params: { locale: Locale };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const messages = await getMessages({ locale: params.locale });

  const t = await getTranslations({
    messages: messages.default,
    namespace: "contact",
  });

  const contactItems = [
    {
      icon: MapPin,
      title: t("CONTACT_ITEMS.ADDRESS.TITLE"),
      info: t("CONTACT_ITEMS.ADDRESS.INFO"),
    },
    {
      icon: Phone,
      title: t("CONTACT_ITEMS.PHONE.TITLE"),
      info: t("CONTACT_ITEMS.PHONE.INFO"),
    },
    {
      icon: Mail,
      title: t("CONTACT_ITEMS.EMAIL.TITLE"),
      info: t("CONTACT_ITEMS.EMAIL.INFO"),
    },
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20 animate-slide-in-from-top">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
              {t("HEADER")}
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("DESCRIPTION")}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <div className="space-y-6 animate-slide-in-from-right">
            {contactItems.map((item) => (
              <Card
                key={item.title}
                className="border-2 border-primary/20 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(0,119,60,0.2)] transition-all duration-700">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {item.info}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="animate-slide-in-from-bottom">
          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-1000">
            <CardHeader>
              <CardTitle className="text-2xl">{t("LOCATION.TITLE")}</CardTitle>
              <CardDescription>{t("LOCATION.DESCRIPTION")}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="w-full h-[500px] rounded-b-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3046.692011744592!2d44.43566887669344!3d40.215913471472646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406a97a79f0b0991%3A0xc1e42640f2879b2!2sO2%20Gardens!5e0!3m2!1sru!2sam!4v1762374279400!5m2!1sru!2sam"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="O2 Gardens Location"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
