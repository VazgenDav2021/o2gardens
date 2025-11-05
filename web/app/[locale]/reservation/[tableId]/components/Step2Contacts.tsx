"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { User, Phone, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Step2Contacts() {
  const { control } = useFormContext();
  const t = useTranslations("common.halls");

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">
        {t("SUMMARY_CONTACT_DETAILS")}
      </h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-base flex items-center gap-2">
            <User size={18} className="text-primary" /> {t("NAME")}
          </Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                id="name"
                {...field}
                placeholder={t("NAME")}
                required
                className="h-12 text-base"
              />
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-base flex items-center gap-2">
            <Phone size={18} className="text-primary" /> {t("PHONE")}
          </Label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                id="phone"
                type="tel"
                {...field}
                placeholder="+374 XX XXX XXX"
                required
                className="h-12 text-base"
              />
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-base flex items-center gap-2">
            <Mail size={18} className="text-primary" /> {t("EMAIL")}
          </Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                id="email"
                type="email"
                {...field}
                placeholder="email@example.com"
                required
                className="h-12 text-base"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
