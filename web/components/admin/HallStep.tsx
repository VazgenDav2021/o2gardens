"use client";

import { HallEditor } from "@/components/admin/HallEditor";
import { Button } from "@/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/ui/card";
import { useHallLayout } from "@/hooks/useHallLayout";
import type { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Event } from "@/types";

interface HallStepProps {
  selectedHall: string | undefined;
  prevStep: () => void;
  setValue: UseFormSetValue<Event>;
  watch: UseFormWatch<Event>;
}

export default function HallStep({
  selectedHall,
  prevStep,
  setValue,
  watch,
}: HallStepProps) {
  const { tables, scenes, addTable, addScene, moveItem, deleteItem } =
    useHallLayout({
      initialTables: watch("schema.tables") || [],
      initialScenes: watch("schema.scenes") || [],
      setValue,
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Схема зала: {selectedHall || "Не выбран зал"}</CardTitle>
      </CardHeader>

      <CardContent>
        <HallEditor
          mode="admin"
          tables={tables}
          scenes={scenes}
          onAddTable={addTable}
          onAddScene={addScene}
          onMoveItem={moveItem}
          onDelete={deleteItem}
          
        />

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
