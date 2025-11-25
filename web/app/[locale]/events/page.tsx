import EventsList from "@/components/client/EventsList";
import { getMessages, getTranslations } from "next-intl/server";
import { Locale } from "@/types";
import { getEvents } from "@/services";

export default async function EventsPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const messages = await getMessages({ locale: params.locale });

  const t = await getTranslations({
    messages: messages.default,
  });

  try {
    const allEvents = await getEvents<"client">({ locale: params.locale });

    if (allEvents.data.length === 0) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
          <p className="text-muted-foreground text-lg">
            {t("events.NO_EVENTS")}
          </p>
        </div>
      );
    }

    return <EventsList events={allEvents.data} messages={messages} />;
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <p className="text-red-500 text-lg">{t("events.LOAD_ERROR")}</p>
      </div>
    );
  }
}
