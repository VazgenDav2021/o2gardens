"use client";

import { useState, useEffect } from "react";
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
import { CalendarIcon, Save, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/ui/card";

import { Event, EventService } from "@/lib/eventService";

const halls = ["Зал 1", "Зал 2", "Терраса"] as const;
type Hall = (typeof halls)[number];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    nameRu: "",
    nameAm: "",
    nameEn: "",
    descriptionRu: "",
    descriptionAm: "",
    descriptionEn: "",
    hall: "",
    minAge: "",
    artistsRu: "",
    artistsAm: "",
    artistsEn: "",
    deposit: "",
    image: "",
    time: "",
  });

  // Загрузка событий
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await EventService.getAll();
        setEvents(data);
      } catch {
        toast({ title: "Ошибка при загрузке событий" });
      }
    };
    fetchEvents();
  }, []);

  // Сохранение события
  const handleSave = async () => {
    if (
      !formData.nameRu ||
      !formData.nameAm ||
      !formData.nameEn ||
      !formData.hall ||
      !date
    ) {
      toast({ title: "Заполните обязательные поля" });
      return;
    }

    const newEvent: Event = {
      name: {
        ru: formData.nameRu,
        hy: formData.nameAm,
        en: formData.nameEn,
      },
      depositPerPerson: Number(formData.deposit || 0),
      isAdult: Number(formData.minAge || 0) >= 18,
      description: {
        ru: formData.descriptionRu,
        hy: formData.descriptionAm,
        en: formData.descriptionEn,
      },
      hall: formData.hall,
      Date: date.toISOString(),
      artists: {
        ru: formData.artistsRu,
        hy: formData.artistsAm,
        en: formData.artistsEn,
      },
      Image: formData.image,
      menu: [],
      totalGuestQny: 0,
      schema: []
    };

    try {
      const savedEvent = await EventService.create(newEvent);
      setEvents([...events, savedEvent]);
      toast({ title: "Событие создано" });

      // Reset
      setFormData({
        nameRu: "",
        nameAm: "",
        nameEn: "",
        descriptionRu: "",
        descriptionAm: "",
        descriptionEn: "",
        hall: "",
        minAge: "",
        artistsRu: "",
        artistsAm: "",
        artistsEn: "",
        deposit: "",
        image: "",
        time: "",
      });
      setDate(undefined);
    } catch {
      toast({ title: "Ошибка при создании события" });
    }
  };

  // Удаление события
  const deleteEventHandler = async (id: string) => {
    try {
      await EventService.delete(id);
      setEvents(events.filter((e) => e._id !== id));
      toast({ title: "Событие удалено" });
    } catch {
      toast({ title: "Ошибка при удалении события" });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Создание события */}
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
                <Label>
                  Название {["Русский", "Армянский", "English"][i]} *
                </Label>
                <Input
                  value={formData[key as keyof typeof formData]}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                />
              </div>
            ))}
          </div>

          {/* Артисты */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["artistsRu", "artistsAm", "artistsEn"].map((key, i) => (
              <div key={key}>
                <Label>Артисты {["Русский", "Армянский", "English"][i]}</Label>
                <Input
                  value={formData[key as keyof typeof formData]}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                />
              </div>
            ))}
          </div>

          {/* Описания */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["descriptionRu", "descriptionAm", "descriptionEn"].map(
              (key, i) => (
                <div key={key}>
                  <Label>
                    Описание {["Русский", "Армянский", "English"][i]}
                  </Label>
                  <Textarea
                    value={formData[key as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                  />
                </div>
              )
            )}
          </div>

          {/* Зал и дата */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Зал *</Label>
              <Select
                value={formData.hall}
                onValueChange={(value) =>
                  setFormData({ ...formData, hall: value })
                }>
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
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" /> Сохранить
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Список событий */}
      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event._id} className="shadow-md">
            <CardContent className="pt-6 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">
                  {event.name.ru} / {event.name.hy} / {event.name.en}
                </h3>
                <p className="text-sm text-muted-foreground">{event.hall}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteEventHandler(event._id!)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
