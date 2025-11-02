"use client";

import { Check, CreditCard } from "lucide-react";
import SummaryCard from './SummaryCard'

interface Step4Props {
  formData: any;
  tableId: string;
  bookingType: string;
  totalGuests: number;
  totalAmount: number;
}

export default function Step4Confirmation({
  formData,
  tableId,
  bookingType,
  totalGuests,
  totalAmount,
}: Step4Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Подтверждение бронирования</h2>

      <div className="space-y-4">
        <SummaryCard title="Детали бронирования">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Столик:</span>
            <span className="font-medium">{tableId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Тип:</span>
            <span className="font-medium">
              {bookingType === "event" ? "Мероприятие" : "Обычный день"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Дата:</span>
            <span className="font-medium">{formData.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Время:</span>
            <span className="font-medium">{formData.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Взрослых:</span>
            <span className="font-medium">{formData.adults}</span>
          </div>
          {bookingType === "event" && formData.children4to10 > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Дети 4-10 лет:</span>
              <span className="font-medium">{formData.children4to10}</span>
            </div>
          )}
          {bookingType === "event" && formData.childrenUnder4 > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Дети до 4 лет:</span>
              <span className="font-medium">{formData.childrenUnder4}</span>
            </div>
          )}
          <div className="flex justify-between font-semibold pt-2 border-t">
            <span className="text-muted-foreground">Всего гостей:</span>
            <span className="font-medium">{totalGuests}</span>
          </div>
        </SummaryCard>

        <SummaryCard title="Контактные данные">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Имя:</span>
            <span className="font-medium">{formData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Телефон:</span>
            <span className="font-medium">{formData.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email:</span>
            <span className="font-medium">{formData.email}</span>
          </div>
        </SummaryCard>

        {bookingType === "event" ? (
          <div className="p-6 bg-gradient-to-br from-primary to-primary text-white rounded-xl flex justify-between items-center">
            <div>
              <p className="text-sm opacity-90">К оплате</p>
              <p className="text-3xl font-bold">
                {totalAmount.toLocaleString()} AMD
              </p>
            </div>
            <CreditCard size={48} className="opacity-75" />
          </div>
        ) : (
          <div className="p-6 bg-gradient-to-br from-accent/20 to-accent/10 border-2 border-accent/30 rounded-xl flex items-center justify-center gap-3">
            <Check className="w-8 h-8 text-accent" />
            <div>
              <p className="text-lg font-semibold">Бронирование без оплаты</p>
              <p className="text-sm text-muted-foreground">
                Подтвердите бронирование, оплата не требуется
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
