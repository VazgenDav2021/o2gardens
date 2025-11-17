"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
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
import { CalendarIcon, Save } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/ui/card";
import { Event, EventService } from "@/lib/eventService";

const halls = ["Зал 1", "Зал 2", "Терраса"] as const;

interface EventFormProps {
  onSave: (event: Event) => void;
}

export function EventForm({ onSave }: EventFormProps) {
  const { register, handleSubmit, control, reset, watch } = useForm<any>({
    defaultValues: {
      nameRu: "",
      nameAm: "",
      nameEn: "",
      descriptionRu: "",
      descriptionAm: "",
      descriptionEn: "",
      hall: "",
      minAge: "",
      isAdult: false,
      artistsRu: "",
      artistsAm: "",
      artistsEn: "",
      deposit: "",
      image: "",
      time: "",
    },
  });

  const [date, setDate] = useState<Date | undefined>();

  const onSubmit = async (data: any) => {
    if (!data.nameRu || !data.nameAm || !data.nameEn || !data.hall || !date) {
      toast({ title: "Заполните обязательные поля" });
      return;
    }

    const newEvent: Event = {
      name: { ru: data.nameRu, hy: data.nameAm, en: data.nameEn },
      description: {
        ru: data.descriptionRu,
        hy: data.descriptionAm,
        en: data.descriptionEn,
      },
      artists: { ru: data.artistsRu, hy: data.artistsAm, en: data.artistsEn },
      hall: data.hall,
      depositPerPerson: Number(data.deposit || 0),
      isAdult: data.isAdult,
      Date: date.toISOString(),
      Image: data.image,
      menu: [],
      totalGuestQny: 0,
      schema: [],
    };

    try {
      const savedEvent = await EventService.create(newEvent);
      onSave(savedEvent);
      toast({ title: "Событие создано" });
      reset();
      setDate(undefined);
    } catch {
      toast({ title: "Ошибка при создании события" });
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Новое событие</CardTitle>
        <CardDescription>Заполните информацию о событии</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Названия */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["nameRu", "nameAm", "nameEn"].map((key, i) => (
            <div key={key}>
              <Label>Название {["Русский", "Армянский", "English"][i]} *</Label>
              <Input {...register(key)} />
            </div>
          ))}
        </div>

        {/* Артисты */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["artistsRu", "artistsAm", "artistsEn"].map((key, i) => (
            <div key={key}>
              <Label>Артисты {["Русский", "Армянский", "English"][i]}</Label>
              <Input {...register(key)} />
            </div>
          ))}
        </div>

        {/* Описания */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["descriptionRu", "descriptionAm", "descriptionEn"].map((key, i) => (
            <div key={key}>
              <Label>Описание {["Русский", "Армянский", "English"][i]}</Label>
              <Textarea {...register(key)} />
            </div>
          ))}
        </div>

        {/* Зал, дата, возраст */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Зал */}
          <div>
            <Label>Зал *</Label>
            <Controller
              control={control}
              name="hall"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
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
              )}
            />
          </div>

          {/* Дата */}
          <div>
            <Label>Дата *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date
                    ? format(date, "dd MMMM yyyy", { locale: ru })
                    : "Выберите дату"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  locale={ru}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Только для взрослых */}
          <div>
            <div className="mt-2">
              <Label>Только для взрослых?</Label>
              <Controller
                control={control}
                name="isAdult"
                render={({ field }) => (
                  <RadioGroup
                    value={field.value ? "yes" : "no"}
                    onValueChange={(v) => field.onChange(v === "yes")}
                    className="flex gap-4 mt-1">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="yes" />
                      <span>Да</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="no" />
                      <span>Нет</span>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={handleSubmit(onSubmit)} className="gap-2">
            <Save className="w-4 h-4" /> Сохранить
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
