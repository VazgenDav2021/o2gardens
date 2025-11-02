"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";

const navItems = [
  { path: "/", label: "Главная" },
  { path: "/halls", label: "Залы" },
  { path: "/events", label: "Мероприятия" },
  { path: "/about", label: "О нас" },
  { path: "/contact", label: "Контакты" },
  { path: "https://o2gardens.am", label: "O₂ Gardens", external: true },
];

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("ru");

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-2xl font-bold text-primary">
              O₂ Cafe & Restaurant
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-8">
              {navItems.map((item) =>
                item.external ? (
                  <a
                    key={item.path}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative py-2 text-sm font-bold text-accent hover:text-accent/80 transition-colors px-4 bg-accent/10 rounded-md">
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`relative py-2 text-sm font-medium transition-colors hover:text-primary ${
                      isActive(item.path)
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}>
                    {item.label}
                    {isActive(item.path) && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-scale-in" />
                    )}
                  </Link>
                )
              )}
            </nav>

            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[120px] bg-background border-border">
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

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 animate-slide-in-up">
            <nav className="space-y-1">
              {navItems.map((item) =>
                item.external ? (
                  <a
                    key={item.path}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 text-sm font-bold text-accent hover:text-accent/80 transition-colors px-4 bg-accent/10 rounded-md">
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-3 text-sm font-medium transition-colors hover:text-primary ${
                      isActive(item.path)
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}>
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            <div className="mt-4 pt-4 border-t border-border">
              <Select value={language} onValueChange={setLanguage}>
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
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
