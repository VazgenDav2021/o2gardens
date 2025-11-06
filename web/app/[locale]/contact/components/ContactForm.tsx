"use client";

import { useState } from "react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import { Label } from "@/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/ui/card";
import { MessageSquare, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

export const ContactForm = () => {
  const t = useTranslations("contact.FORM");
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t("TOAST_TITLE"),
      description: t("TOAST_DESC"),
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <Card className="border-2 border-primary/20 animate-slide-in-from-left">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-3">
          <MessageSquare className="text-primary" size={28} />
          {t("TITLE")}
        </CardTitle>
        <CardDescription className="text-base">
          {t("DESCRIPTION")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t("FIELDS.NAME")} *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder={t("PLACEHOLDERS.NAME")}
                required
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t("FIELDS.PHONE")} *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder={t("PLACEHOLDERS.PHONE")}
                required
                className="h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("FIELDS.EMAIL")} *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder={t("PLACEHOLDERS.EMAIL")}
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{t("FIELDS.MESSAGE")} *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder={t("PLACEHOLDERS.MESSAGE")}
              required
              rows={6}
              className="resize-none"
            />
          </div>

          <Button type="submit" size="lg" className="w-full h-12">
            <Send size={18} className="mr-2" />
            {t("BUTTON_SEND")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
