import { Suspense } from "react";
import { Card, CardContent } from "@/ui/card";
import HallSVGClient from "./components/HallSVGClient";
import TableLegend from "./components/TableLegend";
import SelectedTableCard from "./components/SelectedTableCard";
import { getTranslations } from "next-intl/server";

export default async function HallMapPage({
  params,
}: {
  params: { halId: string; eventId: string; locale: string };
}) {
  const messages = await import(`../../../../../messages/${params.locale}.json`);
  const t = await getTranslations({
    messages: messages.default,
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
