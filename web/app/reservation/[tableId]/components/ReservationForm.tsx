"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Button } from "@/ui/button";
import { ChevronLeft, ChevronRight, CreditCard, Check } from "lucide-react";
import { reservationSchema } from "@/types";
import Step1Details from "./Step1Details";
import Step2Contacts from "./Step2Contacts";
import Stepper from "./Stepper";
import Step4Confirmation from "./Step4Confirmation";
import Step3Menu from "./Step3Menu";

interface ReservationFormProps {
  tableId: string;
  eventDeposit: string | null;
  eventDate: string | null;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

interface MenuCategory {
  [key: string]: MenuItem[];
}

const eventMenus: { [eventType: string]: MenuCategory } = {
  football: {
    Закуски: [
      {
        id: "chips",
        name: "Картофельные чипсы",
        description: "Хрустящие чипсы с солью",
        price: 250,
        category: "Закуски",
      },
      {
        id: "nachos",
        name: "Начос",
        description: "С сырным соусом",
        price: 450,
        category: "Закуски",
      },
      {
        id: "wings",
        name: "Куриные крылышки",
        description: "BBQ или острые",
        price: 650,
        category: "Закуски",
      },
    ],
    Напитки: [
      {
        id: "beer",
        name: "Разливное пиво",
        description: "0.5л",
        price: 350,
        category: "Напитки",
      },
      {
        id: "cola",
        name: "Кола",
        description: "0.5л",
        price: 200,
        category: "Напитки",
      },
    ],
  },
  seafood: {
    Закуски: [
      {
        id: "oysters",
        name: "Устрицы",
        description: "6 шт с лимоном",
        price: 1800,
        category: "Закуски",
      },
      {
        id: "shrimp",
        name: "Креветки гриль",
        description: "250г",
        price: 1200,
        category: "Закуски",
      },
      {
        id: "calamari",
        name: "Кальмары фри",
        description: "С тартаром",
        price: 850,
        category: "Закуски",
      },
    ],
    Основное: [
      {
        id: "salmon",
        name: "Стейк из лосося",
        description: "С овощами гриль",
        price: 1500,
        category: "Основное",
      },
      {
        id: "dorado",
        name: "Дорадо запеченная",
        description: "Целая рыба",
        price: 1600,
        category: "Основное",
      },
    ],
    Напитки: [
      {
        id: "wine",
        name: "Белое вино",
        description: "Бокал",
        price: 450,
        category: "Напитки",
      },
      {
        id: "champagne",
        name: "Шампанское",
        description: "Бокал",
        price: 650,
        category: "Напитки",
      },
    ],
  },
  jazz: {
    Закуски: [
      {
        id: "cheese",
        name: "Сырная тарелка",
        description: "Ассорти из 5 сыров",
        price: 950,
        category: "Закуски",
      },
      {
        id: "bruschetta",
        name: "Брускетта",
        description: "С томатами и базиликом",
        price: 550,
        category: "Закуски",
      },
    ],
    Основное: [
      {
        id: "steak",
        name: "Стейк Рибай",
        description: "300г, средней прожарки",
        price: 2200,
        category: "Основное",
      },
      {
        id: "pasta",
        name: "Паста карбонара",
        description: "С беконом",
        price: 750,
        category: "Основное",
      },
    ],
    Напитки: [
      {
        id: "wine",
        name: "Красное вино",
        description: "Бокал",
        price: 500,
        category: "Напитки",
      },
      {
        id: "cocktail",
        name: "Авторский коктейль",
        description: "По выбору бармена",
        price: 750,
        category: "Напитки",
      },
    ],
  },
};

export default function ReservationForm({
  tableId,
  eventDeposit,
  eventDate,
}: ReservationFormProps) {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    adults: 1,
    children4to10: 0,
    childrenUnder4: 0,
    date: "",
    time: "",
  });

  const bookingType = eventDeposit ? "event" : "regular";
  const depositPerPerson = eventDeposit ? parseInt(eventDeposit) : 15000;

  useEffect(() => {
    if (eventDate) {
      const date = new Date(eventDate);
      setSelectedDate(date);
      setFormData((prev) => ({ ...prev, date: eventDate }));
    }
  }, [eventDate]);

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.adults || !formData.date || !formData.time) {
        toast({
          title: "Заполните все поля",
          description: "Выберите дату, время и гостей",
          variant: "destructive",
        });
        return;
      }
    }

    if (currentStep === 2) {
      if (!formData.name || !formData.phone || !formData.email) {
        toast({
          title: "Заполните все поля",
          description: "Введите имя, телефон и email",
          variant: "destructive",
        });
        return;
      }
    }

    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      reservationSchema.parse(formData);
      toast({
        title: "Успешно!",
        description:
          bookingType === "event"
            ? `Переход к оплате на сумму ${calculateTotal()}`
            : "Бронирование подтверждено!",
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast({
          title: "Ошибка валидации",
          description: err.issues[0]?.message,
          variant: "destructive",
        });
      }
    }
  };

  const calculateTotal = () => {
    const adultsTotal = formData.adults * depositPerPerson;
    const children4to10Total =
      formData.children4to10 * (depositPerPerson * 0.5);
    return adultsTotal + children4to10Total;
  };

  const totalGuests =
    formData.adults + formData.children4to10 + formData.childrenUnder4;

  const currentMenu = eventMenus["football"] || eventMenus.jazz;

  const [selectedMenu, setSelectedMenu] = useState<Set<string>>(new Set());

  return (
    <form onSubmit={handleSubmit}>
      <Stepper currentStep={currentStep} setStep={setCurrentStep} />

      {currentStep === 1 && (
        <Step1Details
          formData={formData}
          setFormData={setFormData}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          bookingType={bookingType}
          depositPerPerson={depositPerPerson}
          calculateTotal={calculateTotal}
        />
      )}

      {currentStep === 2 && (
        <Step2Contacts formData={formData} setFormData={setFormData} />
      )}

      {currentStep === 3 && (
        <Step3Menu
          currentMenu={currentMenu}
          onSelectionChange={(newSelected, total) => {
            setSelectedMenu(newSelected);
            console.log("Итого:", total);
          }}
        />
      )}

      {currentStep === 4 && (
        <Step4Confirmation
          formData={formData}
          bookingType={bookingType}
          tableId={tableId}
          totalAmount={calculateTotal()}
          totalGuests={totalGuests}
        />
      )}

      <div className="flex gap-4 mt-8">
        {currentStep > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="flex-1 h-12">
            <ChevronLeft size={18} className="mr-2" /> Назад
          </Button>
        )}

        {currentStep < 4 ? (
          <Button type="button" onClick={handleNext} className="flex-1 h-12">
            Далее <ChevronRight size={18} className="ml-2" />
          </Button>
        ) : bookingType === "event" ? (
          <Button type="submit" className="flex-1 h-12">
            <CreditCard size={18} className="mr-2" /> Перейти к оплате
          </Button>
        ) : (
          <Button type="submit" className="flex-1 h-12">
            <Check size={18} className="mr-2" /> Подтвердить
          </Button>
        )}
      </div>
    </form>
  );
}
