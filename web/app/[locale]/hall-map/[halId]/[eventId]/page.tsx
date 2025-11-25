import { Suspense } from "react";
import { Card, CardContent } from "@/ui/card";
import TableLegend from "@/components/client/TableLegend";
import SelectedTableCard from "@/components/client/SelectedTableCard";
import HallMapViewer from "@/components/client/HallMapViewer";
import { getMessages, getTranslations } from "next-intl/server";
import { getEvent } from "@/services/eventService";
import { HallSchema } from "@/types";

async function HallMapContent({
  eventId,
  locale,
  ...rest
}: {
  eventId: string;
  locale: string;
}) {
  try {
    const eventResponse = await getEvent(eventId);

    if (!eventResponse.success || !eventResponse.data) {
      return (
        <div className="text-center text-red-500 py-8">Event not found</div>
      );
    }

    const event = eventResponse.data;
    const schema = event.schema as HallSchema | string;

    // If schema is a string (ID), we need to fetch the hall
    if (typeof schema === "string") {
      return (
        <div className="text-center text-red-500 py-8">
          Schema data not available
        </div>
      );
    }

    // Extract tables and scenes from the schema
    const tables = schema.tables || [];
    const scenes = schema.scenes || [];

    return <HallMapViewer tables={tables} scenes={scenes} />;
  } catch (error) {
    console.error("Error loading hall map:", error);
    return (
      <div className="text-center text-red-500 py-8">
        Failed to load hall map. Please try again later.
      </div>
    );
  }
}

export default async function HallMapPage({
  params,
}: {
  params: { halId: string; eventId: string; locale: string };
}) {
  const messages = await getMessages({ locale: params.locale });
  const t = await getTranslations({
    messages: messages,
    namespace: "common.hallMap",
  });

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center animate-fade-in">
          {t("TITLE")}
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-12 animate-fade-in">
          {t("DESCRIPTION")}
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="animate-fade-in">
              <CardContent className="p-8">
                <Suspense
                  fallback={
                    <div className="text-center py-8">{t("LOADING")}</div>
                  }>
                  <HallMapContent
                    eventId={params.eventId}
                    locale={params.locale}
                  />
                </Suspense>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="font-semibold">{t("LEGEND_TITLE")}</h2>
            <TableLegend />
            <h2 className="font-semibold">{t("SELECTED_TABLE_TITLE")}</h2>
            <Suspense fallback={null}>
              <SelectedTableCard eventId={params.eventId} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
