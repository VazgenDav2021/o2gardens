import { getMockEvents } from "@/lib/mock/getEvents";
import EventsList from "@/components/client/EventsList";
import { getMessages, getTranslations } from "next-intl/server";
import { Event, Locale } from "@/types";

export default async function EventsPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const messages = await getMessages({ locale: params.locale });

  const t = await getTranslations({
    messages: messages.default,
    namespace: "events",
  });

  try {
    const allEvents: Event[] = await getMockEvents("normal", params.locale);

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
