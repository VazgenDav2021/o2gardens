"use client";

import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { User, Phone, Mail } from "lucide-react";

interface Step2Props {
  formData: any;
  setFormData: (data: any) => void;
}

export default function Step2Contacts({ formData, setFormData }: Step2Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Контактная информация</h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-base flex items-center gap-2">
            <User size={18} className="text-primary" /> Имя и Фамилия
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Иван Иванов"
            required
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-base flex items-center gap-2">
            <Phone size={18} className="text-primary" /> Телефон
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="+374 XX XXX XXX"
            required
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-base flex items-center gap-2">
            <Mail size={18} className="text-primary" /> Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="email@example.com"
            required
            className="h-12 text-base"
          />
        </div>
      </div>
    </div>
  );
}
