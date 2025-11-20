"use client";

import { Button } from "@/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/ui/card";

interface HallStepProps {
  selectedHall: string;
  prevStep: () => void;
}

export default function HallStep({ selectedHall, prevStep }: HallStepProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Схема зала: {selectedHall || "Не выбран зал"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mt-6">
          <Button type="button" onClick={prevStep}>
            ← Назад
          </Button>
          <Button type="submit">Сохранить событие</Button>
        </div>
      </CardContent>
    </Card>
  );
}
