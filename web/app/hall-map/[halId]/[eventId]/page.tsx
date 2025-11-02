import { Suspense } from "react";
import { Card, CardContent } from "@/ui/card";
import HallSVGClient from "./components/HallSVGClient";
import TableLegend from "./components/TableLegend";
import SelectedTableCard from "./components/SelectedTableCard";

export default async function HallMapPage({
  params,
  searchParams,
}: {
  params: { hallId: string };
  searchParams: { eventDeposit?: string; eventDate?: string };
}) {
  const { hallId } = params;
  const { eventDeposit, eventDate } = searchParams;

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center animate-fade-in">
          Схема зала
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-12 animate-fade-in">
          Выберите свободный столик
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="animate-fade-in">
              <CardContent className="p-8">
                <Suspense fallback={<div>Загрузка...</div>}>
                  <HallSVGClient />
                </Suspense>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <TableLegend />
            <Suspense fallback={null}>
              <SelectedTableCard />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
