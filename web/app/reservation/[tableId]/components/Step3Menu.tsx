"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/ui/card";

const menuItems = ["Салат", "Суп", "Основное блюдо", "Десерт"];

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
interface Step4MenuProps {
  currentMenu: MenuCategory;
  onSelectionChange: (selected: Set<string>, total: number) => void;
  defaultSelected?: Set<string>;
}

export default function Step4Menu({
  currentMenu,
  onSelectionChange,
  defaultSelected = new Set(),
}: Step4MenuProps) {
  const [selectedMenu, setSelectedMenu] =
    useState<Set<string>>(defaultSelected);
  const toggleMenuItem = (itemId: string) => {
    const newSelected = new Set(selectedMenu);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedMenu(newSelected);
    onSelectionChange(newSelected, calculateTotal(newSelected));
  };
  const calculateTotal = (selection: Set<string>) => {
    let total = 0;
    Object.values(currentMenu).forEach((category) => {
      category.forEach((item) => {
        if (selection.has(item.id)) total += item.price;
      });
    });
    return total;
  };
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Выберите блюда из меню</h3>
        <div className="space-y-6">
          {Object.entries(currentMenu).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-md font-medium mb-3 text-primary">
                {category}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {items.map((item) => (
                  <Card
                    key={item.id}
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md",
                      selectedMenu.has(item.id) &&
                        "border-primary bg-primary/5 shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]"
                    )}
                    onClick={() => toggleMenuItem(item.id)}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h5 className="font-medium mb-1">{item.name}</h5>
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
                            selectedMenu.has(item.id)
                              ? "bg-primary border-primary"
                              : "border-muted-foreground"
                          )}>
                          {selectedMenu.has(item.id) && (
                            <Check className="w-4 h-4 text-primary-foreground" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t pt-4">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Итого:</span>
          <span className="text-primary">{calculateTotal(selectedMenu)} ₽</span>
        </div>
      </div>
    </div>
  );
}
