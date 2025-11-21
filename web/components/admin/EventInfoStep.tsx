"use client";

import {
  Control,
  useFieldArray,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/ui/select";
import { MenuItem } from "@/types";

const HALLS = [
  { value: "hall1", label: "Зал 1" },
  { value: "hall2", label: "Зал 2" },
  { value: "hall3", label: "Зал 3" },
];

interface EventInfoStepProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  control: Control<any>;
  watch: UseFormWatch<any>;
  nextStep: () => void;
}

export default function EventInfoStep({
  register,
  setValue,
  watch,
  nextStep,
  control,
}: EventInfoStepProps) {
  const selectedHall = watch("hall");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "menu",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Информация о событии</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Название */}
        <div className="grid grid-cols-3 gap-3 items-center">
          <div>
            <Label>Название (рус.)</Label>
            <Input {...register("name.ru")} />
          </div>
          <div>
            <Label>Название (англ.)</Label>
            <Input {...register("name.en")} />
          </div>
          <div>
            <Label>Название (арм.)</Label>
            <Input {...register("name.hy")} />
          </div>
        </div>

        {/* Описание */}
        <div className="grid grid-cols-3 gap-3 items-center">
          <div>
            <Label>Описание (рус.)</Label>
            <Textarea {...register("description.ru")} />
          </div>
          <div>
            <Label>Описание (англ.)</Label>
            <Textarea {...register("description.en")} />
          </div>
          <div>
            <Label>Описание (арм.)</Label>
            <Textarea {...register("description.hy")} />
          </div>
        </div>

        {/* Артисты */}
        <div className="grid grid-cols-3 gap-3 items-center">
          <div>
            <Label>Артисты (рус.)</Label>
            <Input {...register("artists.ru")} />
          </div>
          <div>
            <Label>Артисты (англ.)</Label>
            <Input {...register("artists.en")} />
          </div>
          <div>
            <Label>Артисты (арм.)</Label>
            <Input {...register("artists.hy")} />
          </div>
        </div>

        {/* Дополнительно */}
        <div className="grid grid-cols-2 items-center">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="h-4 w-4"
              {...register("isAdult")}
            />
            <Label>Для совершеннолетних</Label>
          </div>
          <div className="space-y-2">
            <Label>Выбор зала</Label>
            <Select onValueChange={(v) => setValue("hall", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите зал" />
              </SelectTrigger>
              <SelectContent>
                {HALLS.map((h) => (
                  <SelectItem key={h.value} value={h.value}>
                    {h.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4 flex flex-col">
          <Label className="font-semibold text-lg">Меню</Label>
          <div className="overflow-scroll max-h-[500px] flex flex-col gap-4">
            {fields.map((item, index) => (
              <Card key={item.id} className="p-4 border border-gray-300">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label>Название (рус.)</Label>
                    <Input {...register(`menu.${index}.name.ru` as const)} />
                  </div>
                  <div>
                    <Label>Название (англ.)</Label>
                    <Input {...register(`menu.${index}.name.en` as const)} />
                  </div>
                  <div>
                    <Label>Название (арм.)</Label>
                    <Input {...register(`menu.${index}.name.hy` as const)} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-2">
                  <div>
                    <Label>Описание (рус.)</Label>
                    <Textarea
                      {...register(`menu.${index}.description.ru` as const)}
                    />
                  </div>
                  <div>
                    <Label>Описание (англ.)</Label>
                    <Textarea
                      {...register(`menu.${index}.description.en` as const)}
                    />
                  </div>
                  <div>
                    <Label>Описание (арм.)</Label>
                    <Textarea
                      {...register(`menu.${index}.description.hy` as const)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2 items-center">
                  <div>
                    <Label>Цена</Label>
                    <Input
                      type="text"
                      {...register(`menu.${index}.price` as const)}
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-2">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}>
                    Удалить
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <Button
            type="button"
            onClick={() =>
              append({
                name: { ru: "", en: "", hy: "" },
                description: { ru: "", en: "", hy: "" },
                price: "",
              } as MenuItem)
            }>
            Добавить пункт меню
          </Button>
        </div>

        <div className="flex justify-end mt-4">
          <Button type="button" onClick={nextStep} disabled={!selectedHall}>
            Далее →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
