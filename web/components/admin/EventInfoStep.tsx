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
import { Event } from "@/types";
import { HALLS } from "@/constants";

interface EventInfoStepProps {
  register: UseFormRegister<Event>;
  setValue: UseFormSetValue<Event>;
  control: Control<Event>;
  watch: UseFormWatch<Event>;
  nextStep: () => void;
  onImageFileChange: (file: File | null) => void;
  imagePreview?: string;
}

export default function EventInfoStep({
  register,
  setValue,
  watch,
  nextStep,
  control,
  onImageFileChange,
  imagePreview,
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

        <div className="grid grid-cols-2 items-center gap-4">
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
            <Select
              defaultValue={selectedHall}
              onValueChange={(v) => setValue("hall", v)}>
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

        <div className="grid grid-cols-4 gap-3 items-center mt-4">
          <div>
            <Label>Дата события</Label>
            <Input type="date" {...register("date")} />
          </div>
          <div>
            <Label>Депозит</Label>
            <Input min={0} type="number" {...register("deposit")} />
          </div>
          <div>
            <Label>Время начала</Label>
            <Input type="time" {...register("timeStart")} />
          </div>
        </div>

        <div>
          <Label>Изображение события</Label>

          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) {
                onImageFileChange(null);
                setValue("image", "");
                return;
              }

              onImageFileChange(file);
              const localUrl = URL.createObjectURL(file);
              setValue("image", localUrl);
            }}
          />

          {(imagePreview || watch("image")) && (
            <div className="mt-3 w-full">
              <img
                src={imagePreview || watch("image")}
                alt="Preview"
                className="w-full h-32 rounded object-cover border"
              />
            </div>
          )}
        </div>

        <div className="space-y-4 flex flex-col mt-4">
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
                      type="number"
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
                price: 0,
              })
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
