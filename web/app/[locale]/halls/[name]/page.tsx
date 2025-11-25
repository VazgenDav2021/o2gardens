import EventBooking from "@/components/client/EventBooking";
import { getMessages, getTranslations } from "next-intl/server";
import { Event, Locale } from "@/types";
import { getHall } from "@/services/hallService";

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

  let hallInfo = null;
  let hallError: string | null = null;
  let allEvents: Event<"client">[] = [];
  let error: string | null = null;

  try {
    const hallResponse = await getHall<"client">(params.name, params.locale);
    if (hallResponse.success) {
      hallInfo = hallResponse.data;
      allEvents = hallResponse.data.events ?? [];
    } else {
      hallError = "Hall not found";
    }
  } catch (err) {
    hallError = "Failed to load hall information. Please try again later.";
  }

  if (hallError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <p className="text-red-500 text-lg">{hallError}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }


  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto max-w-4xl">
        {hallInfo && (
          <div className="mb-8 text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {hallInfo.name}
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              {hallInfo.description}
            </p>
          </div>
        )}
        <EventBooking allEvents={allEvents} hall={params.name} />
      </div>
    </div>
  );
}
