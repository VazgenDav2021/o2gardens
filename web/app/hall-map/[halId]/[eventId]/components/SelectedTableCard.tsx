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
import { useRouter, useSearchParams } from "next/navigation";
import { useSelectedTableStore } from "@/hooks/useSelectedTableStore";

const tables = [
  { id: "table-1", capacity: 2 },
  { id: "table-2", capacity: 4 },
  { id: "table-3", capacity: 6 },
  { id: "table-4", capacity: 4 },
  { id: "table-5", capacity: 6 },
  { id: "table-6", capacity: 8 },
];

export default function SelectedTableCard() {
  const { selectedTable } = useSelectedTableStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!selectedTable) return null;

  const eventDeposit = searchParams.get("eventDeposit");
  const eventDate = searchParams.get("eventDate");
  const capacity = tables.find((t) => t.id === selectedTable)?.capacity || 0;

  const handleContinue = () => {
    const params = new URLSearchParams();
    if (eventDeposit) params.append("deposit", eventDeposit);
    if (eventDate) params.append("eventDate", eventDate);
    const url = params.toString()
      ? `/reservation/${selectedTable}?${params.toString()}`
      : `/reservation/${selectedTable}`;
    router.push(url);
  };

  return (
    <Card className="animate-scale-in">
      <CardHeader>
        <CardTitle>Выбранный столик</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          {capacity} мест
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleContinue} className="w-full">
          Продолжить бронирование
        </Button>
      </CardContent>
    </Card>
  );
}
