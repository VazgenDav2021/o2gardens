"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/ui/card";
import { Button } from "@/ui/button";
import { Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelectedTableStore } from "@/hooks/useSelectedTableStore";
import { useTranslations } from "next-intl";

export default function SelectedTableCard({ eventId }: { eventId: string }) {
  const t = useTranslations("common.hallMap");
  const { selectedTable, selectedTableSeats } = useSelectedTableStore();
  const router = useRouter();

  if (!selectedTable) return null;

  const handleContinue = () => {
    const url = `/reservation/${selectedTable}?eventId=${eventId}`;
    router.push(url);
  };

  return (
    <Card className="animate-scale-in">
      <CardHeader>
        <CardTitle>{t("SELECTED_TABLE_TITLE")}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          {selectedTableSeats || 0} {t("SEAT")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleContinue} className="w-full">
          {t("CONTINUE_BOOKING")}
        </Button>
      </CardContent>
    </Card>
  );
}
