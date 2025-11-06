import { getEventById } from "@/lib/mock/getEvents";
import ReservationForm from "./components/ReservationForm";
import { EventType } from "@/types";
import { getTranslations } from "next-intl/server";
import { AbstractIntlMessages } from "next-intl";

interface ReservationPageProps {
  params: { tableId: string };
  searchParams: {
    deposit?: string;
    eventId?: string;
  };
  messages: AbstractIntlMessages;
}

export default async function ReservationPage({
  params,
  searchParams,
  messages,
}: ReservationPageProps) {
  const t = await getTranslations({
    messages,
    namespace: "common.reservations",
  });
  try {
    const { tableId } = params;
    const eventId = searchParams?.eventId ?? null;

    if (!tableId) {
      throw new Error("Missing table ID");
    }

    let eventData: EventType | null = null;

    if (eventId) {
      eventData = await getEventById(eventId);
    }

    return (
      <div className="container mx-auto max-w-4xl pt-32 pb-20 bg-gradient-to-b from-background to-muted/20">
        <ReservationForm
          tableId={tableId}
          deposit={eventData?.deposit ?? 0}
          date={eventData?.date ?? 0}
          eventTimeStart={eventData?.timeStart ?? ""}
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
