"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const currentLocale = pathname.split("/")[1] || "en";
    setLanguage(currentLocale);
  }, [pathname]);

  const handleChange = (newLocale: string) => {
    setLanguage(newLocale);
    const [, , ...rest] = pathname.split("/");
    const newPath = `/${newLocale}/${rest.join("/")}`;
    router.push(newPath);
  };

  return (
    <div className="border-t border-border">
      <Select value={language} onValueChange={handleChange}>
        <SelectTrigger className="w-full bg-background border-border">
          <Globe className="mr-2 h-4 w-4" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-background border-border">
          <SelectItem value="ru">Русский</SelectItem>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="hy">Հայերեն</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
