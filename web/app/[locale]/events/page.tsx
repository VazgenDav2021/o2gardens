import { getMockEvents } from "@/lib/mock/getEvents";
import { EventType } from "@/types";
import EventsList from "./components/EventsList";
import { getLocale, getTranslations } from "next-intl/server";
import { AbstractIntlMessages } from "next-intl";
import { Locale } from "@/navigation";

interface EventsPageProps {
  messages: AbstractIntlMessages;
}

export default async function EventsPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const messages = await import(
    `../../../messages/${params.locale}/events.json`
  );

  const t = await getTranslations({
    messages: messages.default,
    namespace: "events",
  });

  try {
    const allEvents: EventType[] = await getMockEvents("normal", params.locale);

    if (allEvents.length === 0) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
          <p className="text-muted-foreground text-lg">
            {t("events.NO_EVENTS")}
          </p>
        </div>
      );
    }

    return <EventsList events={allEvents} messages={messages} />;
  } catch (error) {
    console.error("Error loading events:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <p className="text-red-500 text-lg">{t("events.LOAD_ERROR")}</p>
      </div>
    );
  }
}
