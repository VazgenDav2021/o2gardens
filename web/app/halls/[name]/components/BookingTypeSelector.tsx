"use client";

import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { Label } from "@/ui/label";

interface BookingTypeSelectorProps {
  bookingType: "regular" | "event";
  onChange: (value: "regular" | "event") => void;
}

const BookingTypeSelector = ({
  bookingType,
  onChange,
}: BookingTypeSelectorProps) => {
  return (
    <RadioGroup value={bookingType} onValueChange={onChange}>
      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer">
        <RadioGroupItem value="regular" id="regular" />
        <Label htmlFor="regular" className="flex-1 cursor-pointer">
          <div className="font-semibold">Обычный день</div>
          <div className="text-sm text-muted-foreground">
            Забронировать столик на любой доступный день
          </div>
        </Label>
      </div>
      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer mt-2">
        <RadioGroupItem value="event" id="event" />
        <Label htmlFor="event" className="flex-1 cursor-pointer">
          <div className="font-semibold">Мероприятие</div>
          <div className="text-sm text-muted-foreground">
            Забронировать на специальное мероприятие (5 дат в ноябре)
          </div>
        </Label>
      </div>
    </RadioGroup>
  );
};

export default BookingTypeSelector;
