"use client";

import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { Label } from "@/ui/label";
import { useTranslations } from "next-intl";
import { BookingType } from "@/types";



interface BookingTypeSelectorProps {
  bookingType: BookingType;
  onChange: (value: BookingType) => void;
}

const BookingTypeSelector = ({
  bookingType,
  onChange,
}: BookingTypeSelectorProps) => {
  const t = useTranslations("common.bookingType");

  return (
    <RadioGroup value={bookingType} onValueChange={onChange}>
      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer">
        <RadioGroupItem value="regular" id="regular" />
        <Label htmlFor="regular" className="flex-1 cursor-pointer">
          <div className="font-semibold">{t("REGULAR")}</div>
          <div className="text-sm text-muted-foreground">
            {t("REGULAR_DESC")}
          </div>
        </Label>
      </div>

      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer mt-2">
        <RadioGroupItem value="event" id="event" />
        <Label htmlFor="event" className="flex-1 cursor-pointer">
          <div className="font-semibold">{t("EVENT")}</div>
          <div className="text-sm text-muted-foreground">{t("EVENT_DESC")}</div>
        </Label>
      </div>
    </RadioGroup>
  );
};

export default BookingTypeSelector;
