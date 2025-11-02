"use client";

import { Calendar as CalendarIcon, Clock, Users, Baby } from "lucide-react";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { Calendar } from "@/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface Step1Props {
  formData: any;
  setFormData: (data: any) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  bookingType: string;
  depositPerPerson: number;
  calculateTotal: () => number;
}

export default function Step1Details({
  formData,
  setFormData,
  selectedDate,
  setSelectedDate,
  bookingType,
  depositPerPerson,
  calculateTotal,
}: Step1Props) {
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return [`${hour}:00`, `${hour}:30`];
  }).flat();

  const totalGuests =
    formData.adults + formData.children4to10 + formData.childrenUnder4;
  const totalAmount = calculateTotal();

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Детали бронирования</h2>

      <div className="space-y-4">
        <Label className="text-base font-semibold">Количество гостей</Label>

        <div className="space-y-2">
          <Label htmlFor="adults" className="text-base flex items-center gap-2">
            <Users size={18} className="text-primary" /> Взрослые
          </Label>
          <Input
            id="adults"
            type="number"
            min={1}
            max={20}
            value={formData.adults}
            onChange={(e) =>
              setFormData({
                ...formData,
                adults: parseInt(e.target.value) || 1,
              })
            }
            className="h-12 text-base"
          />
        </div>

        {bookingType === "event" && (
          <>
            <div className="space-y-2">
              <Label
                htmlFor="children4to10"
                className="text-base flex items-center gap-2">
                <Baby size={18} className="text-primary" /> Дети 4-10 лет
                (скидка 50%)
              </Label>
              <Input
                id="children4to10"
                type="number"
                min={0}
                max={20}
                value={formData.children4to10}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    children4to10: parseInt(e.target.value) || 0,
                  })
                }
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="childrenUnder4"
                className="text-base flex items-center gap-2">
                <Baby size={18} className="text-primary" /> Дети до 4 лет
                (бесплатно)
              </Label>
              <Input
                id="childrenUnder4"
                type="number"
                min={0}
                max={20}
                value={formData.childrenUnder4}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    childrenUnder4: parseInt(e.target.value) || 0,
                  })
                }
                className="h-12 text-base"
              />
            </div>
          </>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-base flex items-center gap-2">
            <CalendarIcon size={18} className="text-primary" /> Дата
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-12 w-full justify-start text-left text-base font-normal",
                  !selectedDate && "text-muted-foreground"
                )}>
                <CalendarIcon className="mr-2 h-5 w-5" />
                {selectedDate
                  ? format(selectedDate, "d MMMM yyyy", { locale: ru })
                  : "Выберите дату"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setFormData({
                    ...formData,
                    date: date ? format(date, "yyyy-MM-dd") : "",
                  });
                }}
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
                initialFocus
                locale={ru}
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label className="text-base flex items-center gap-2">
            <Clock size={18} className="text-primary" /> Время
          </Label>
          <Select
            value={formData.time}
            onValueChange={(value) =>
              setFormData({ ...formData, time: value })
            }>
            <SelectTrigger className="h-12 text-base">
              <SelectValue placeholder="Выберите время" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {bookingType === "event" && (
        <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/5 border-2 border-primary/20 rounded-xl space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Депозит на взрослого:</span>
            <span className="font-semibold">
              {depositPerPerson.toLocaleString()} AMD
            </span>
          </div>
          {formData.children4to10 > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">
                Дети 4-10 лет ({formData.children4to10}):
              </span>
              <span className="font-semibold">
                {(
                  formData.children4to10 *
                  depositPerPerson *
                  0.5
                ).toLocaleString()}{" "}
                AMD
              </span>
            </div>
          )}
          {formData.childrenUnder4 > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">
                Дети до 4 лет ({formData.childrenUnder4}):
              </span>
              <span className="font-semibold">0 AMD</span>
            </div>
          )}
          <div className="pt-3 border-t border-primary/20 flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Всего гостей: {totalGuests}
            </span>
            <span className="text-2xl font-bold text-primary">
              {totalAmount.toLocaleString()} AMD
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
