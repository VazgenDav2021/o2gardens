import { getEventById } from "@/lib/mock/getEvents";
import ReservationForm from "@/components/client/ReservationForm";
import { getMessages, getTranslations } from "next-intl/server";
import { Event, Locale } from "@/types";

interface ReservationPageProps {
  params: { tableId: string; locale: Locale };
  searchParams: { deposit?: string; eventId?: string };
}

export default async function ReservationPage({
  params,
  searchParams,
}: ReservationPageProps) {
  const messages = await getMessages({ locale: params.locale });
  const t = await getTranslations({
    messages: messages,
    namespace: "common.reservations",
  });

  try {
    const { tableId } = params;
    const eventId = searchParams?.eventId ?? null;

    if (!tableId) {
      throw new Error("Missing table ID");
    }

    let eventData: Event | null = null;

    if (eventId) {
      eventData = await getEventById(eventId, params.locale);
    }

    return (
      <div className="container mx-auto max-w-4xl pt-32 pb-20 bg-gradient-to-b from-background to-muted/20">
        <ReservationForm
          tableId={tableId}
          deposit={eventData?.deposit ?? 0}
          date={eventData?.date ?? 0}
          eventTimeStart={eventData?.timeStart ?? 0}
        />
      </div>
    );
  } catch (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-2">
          {t("errorTitle")}
        </h1>
        <p className="text-muted-foreground">{t("errorMessage")}</p>
      </div>
    );
  }
}
