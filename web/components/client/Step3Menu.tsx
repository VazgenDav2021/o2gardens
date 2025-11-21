"use client";

import React, { use } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Card, CardContent } from "@/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";

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
interface Step3MenuProps {
  currentMenu: MenuCategory;
  onSelectionChange?: (selected: Set<string>, total: number) => void;
}

export default function Step3Menu({
  currentMenu,
  onSelectionChange = () => {},
}: Step3MenuProps) {
  const { control, watch } = useFormContext();
  const menuValue = watch("menu") || [];
  const t = useTranslations("common");

  const calculateTotal = (selection: string[]) => {
    let total = 0;
    Object.values(currentMenu).forEach((category) => {
      category.forEach((item) => {
        if (selection.includes(item.id)) total += item.price;
      });
    });
    return total;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">{t("step3Menu.TITLE")}</h3>
        <div className="space-y-6">
          {Object.entries(currentMenu).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-md font-medium mb-3 text-primary">
                {category}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Controller
                  name="menu"
                  control={control}
                  render={({ field }) => {
                    const selection: string[] = field.value || [];
                    const toggle = (id: string) => {
                      const next = new Set(selection);
                      if (next.has(id)) next.delete(id);
                      else next.add(id);
                      const arr = Array.from(next);
                      field.onChange(arr);
                      onSelectionChange(new Set(arr), calculateTotal(arr));
                    };
                    return (
                      <>
                        {items.map((item) => (
                          <Card
                            key={item.id}
                            className={cn(
                              "cursor-pointer transition-all hover:shadow-md",
                              selection.includes(item.id) &&
                                "border-primary bg-primary/5 shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]"
                            )}
                            onClick={() => toggle(item.id)}>
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h5 className="font-medium mb-1">
                                    {item.name}
                                  </h5>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {item.description}
                                  </p>
                                  <p className="text-lg font-semibold text-primary">
                                    {item.price} ₽
                                  </p>
                                </div>
                                <div
                                  className={cn(
                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                                    selection.includes(item.id)
                                      ? "bg-primary border-primary"
                                      : "border-muted-foreground"
                                  )}>
                                  {selection.includes(item.id) && (
                                    <Check className="w-4 h-4 text-primary-foreground" />
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </>
                    );
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t pt-4">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>{t("step3Menu.TOTAL")}</span>
          <span className="text-primary">{calculateTotal(menuValue)}</span>
        </div>
      </div>
    </div>
  );
}
