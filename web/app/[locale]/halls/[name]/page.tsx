import { EventType } from "@/types";
import { getMockEvents } from "@/lib/mock/getEvents";
import EventBooking from "./components/EventBooking";
import { AbstractIntlMessages, useTranslations } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { Locale } from "@/navigation";

interface EventPageProps {
  params: { name: string };
  messages: AbstractIntlMessages;
}

export default async function EventPage({
  params: { name },
  messages,
}: EventPageProps) {
  const t = await getTranslations({ messages, namespace: "common.halls" });
  const locale = await getLocale();

  let allEvents: EventType[] = [];
  let error: string | null = null;

  try {
    allEvents = await getMockEvents("normal", locale as Locale);
  } catch (err) {
    error = t("ERROR_LOADING_EVENTS");
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (allEvents.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <p className="text-muted-foreground text-lg">{t("NO_EVENTS")}</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center animate-fade-in">
          {t("BOOKING_TITLE")}
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-8 animate-fade-in">
          {t("BOOKING_DESCRIPTION")}
        </p>
        <EventBooking allEvents={allEvents} hallId={name} />
      </div>
    </div>
  );
}
