import { Suspense } from "react";
import { Card, CardContent } from "@/ui/card";
import HallSVGClient from "./components/HallSVGClient";
import TableLegend from "./components/TableLegend";
import SelectedTableCard from "./components/SelectedTableCard";
import { AbstractIntlMessages, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

interface HallMapPageProps {
  messages: AbstractIntlMessages;
  params: {
    halId: string;
    eventId: string;
  };
}

export default async function HallMapPage({ messages, params }: HallMapPageProps) {
  const t = await getTranslations({ messages, namespace: "common.hallMap" });

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
                <Suspense fallback={<div>{t("LOADING")}</div>}>
                  <HallSVGClient />
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
