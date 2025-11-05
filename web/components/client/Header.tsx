"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

const navItemsConfig = [
  { path: "/", key: "HOME" },
  { path: "/halls", key: "HALLS" },
  { path: "/events", key: "EVENTS" },
  { path: "/about", key: "ABOUT" },
  { path: "/contact", key: "CONTACT" },
  { path: "https://o2gardens.am", key: "O2GARDENS", external: true },
];

const Header = () => {
  const t = useTranslations("common.header");
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-2xl font-bold text-primary">{t("LOGO")}</div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-8">
              {navItemsConfig.map((item) =>
                item.external ? (
                  <a
                    key={item.path}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative py-2 text-sm font-bold text-accent hover:text-accent/80 transition-colors px-4 bg-accent/10 rounded-md">
                    {t(`NAV.${item.key}`)}
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
                    {t(`NAV.${item.key}`)}
                    {isActive(item.path) && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-scale-in" />
                    )}
                  </Link>
                )
              )}
            </nav>
            <LanguageSwitcher />
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
              {navItemsConfig.map((item) =>
                item.external ? (
                  <a
                    key={item.path}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 text-sm font-bold text-accent hover:text-accent/80 transition-colors px-4 bg-accent/10 rounded-md">
                    {t(`NAV.${item.key}`)}
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
                    {t(`NAV.${item.key}`)}
                  </Link>
                )
              )}
            </nav>

            <LanguageSwitcher />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
