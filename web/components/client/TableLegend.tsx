"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { useTranslations } from "next-intl";

export default function TableLegend() {
  const t = useTranslations("common.hallMap");

  return (
    <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <CardHeader>
        <CardTitle>{t("HINT")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-white border-2 border-primary"></div>
          <span className="text-sm">{t("FREE")}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary"></div>
          <span className="text-sm">{t("SELECTED")}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gray-400 opacity-50"></div>
          <span className="text-sm">{t("OCCUPIED")}</span>
        </div>
      </CardContent>
    </Card>
  );
}
