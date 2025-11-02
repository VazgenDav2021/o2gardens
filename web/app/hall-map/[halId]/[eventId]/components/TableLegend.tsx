"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

export default function TableLegend() {
  return (
    <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <CardHeader>
        <CardTitle>Подсказка</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-white border-2 border-primary"></div>
          <span className="text-sm">Свободно</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary"></div>
          <span className="text-sm">Выбрано</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gray-400 opacity-50"></div>
          <span className="text-sm">Занято</span>
        </div>
      </CardContent>
    </Card>
  );
}
