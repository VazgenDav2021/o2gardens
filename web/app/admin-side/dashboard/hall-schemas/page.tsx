"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { toast } from "@/hooks/useToast";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/ui/popover";
import { Calendar } from "@/ui/calendar";
import { CalendarIcon, Plus, Save, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/ui/card";
import { HallSchema } from "@/types";

const halls = ["Зал 1", "Зал 2", "Терраса"];

const HallSchemas = () => {
  const [schemas, setSchemas] = useState<HallSchema[]>([]);
  const [selectedHall, setSelectedHall] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleSave = () => {
    if (!selectedHall || !startDate || !endDate) {
      toast({ title: "Заполните все поля и добавьте столы" });
      return;
    }
    if (endDate < startDate) {
      toast({ title: "Дата окончания должна быть позже даты начала" });
      return;
    }

    const newSchema = {
      hallId: selectedHall,
      dateRange: {
        startDate,
        endDate,
      },
      tables: [],
      scenes: [],
    };

    setSchemas((prev) => [...prev, newSchema]);
    setSelectedHall("");
    setStartDate(undefined);
    setEndDate(undefined);
    toast({ title: "Схема зала создана" });
  };

  const deleteSchema = (id: string) => {
    setSchemas((prev) => prev.filter((s) => s._id !== id));
    toast({ title: "Схема удалена" });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Схемы залов</h2>
          <p className="text-muted-foreground mt-1">
            Создание схем расположения столов с интервалом действия
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> Создать схему
        </Button>
      </div>

      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle>Новая схема зала</CardTitle>
          <CardDescription>
            Выберите зал, интервал дат и создайте расположение столов
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Зал *</Label>
              <Select value={selectedHall} onValueChange={setSelectedHall}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите зал" />
                </SelectTrigger>
                <SelectContent>
                  {halls.map((hall) => (
                    <SelectItem key={hall} value={hall}>
                      {hall}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Дата начала *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate
                      ? format(startDate, "dd MMMM yyyy", { locale: ru })
                      : "Выберите дату"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    locale={ru}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Дата окончания *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate
                      ? format(endDate, "dd MMMM yyyy", { locale: ru })
                      : "Выберите дату"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    locale={ru}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" /> Сохранить схему
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {schemas.map((schema) => (
          <Card key={schema._id} className="shadow-md">
            <CardContent className="pt-6 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{schema.hallId}</h3>
                <p className="text-sm text-muted-foreground">
                  с {schema.dateRange.startDate.toISOString()} по{" "}
                  {schema.dateRange.endDate.toISOString()}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteSchema(schema._id!)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HallSchemas;
