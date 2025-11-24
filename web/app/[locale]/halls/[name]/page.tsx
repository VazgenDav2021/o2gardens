import { getMockEvents } from "@/lib/mock/getEvents";
import EventBooking from "@/components/client/EventBooking";
import { getMessages, getTranslations } from "next-intl/server";
import { Event, Locale } from "@/types";

export default async function EventPage({
  params,
}: {
  params: { name: string; locale: Locale };
}) {
  const messages = await getMessages({ locale: params.locale });
  const t = await getTranslations({
    messages: messages,
    namespace: "common.halls",
  });

  let allEvents: Event[] = [];
  let error: string | null = null;

  try {
    allEvents = await getMockEvents("normal", params.locale as Locale);
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
        <EventBooking allEvents={allEvents} hall={params.name} />
      </div>
    </div>
  );
}
