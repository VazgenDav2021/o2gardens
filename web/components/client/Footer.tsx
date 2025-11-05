"use client";

import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getCurrentYear } from "@/lib/getCurrentYear";

const Footer = () => {
  const t = useTranslations("common");

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="animate-fade-in">
            <h3 className="text-xl font-bold mb-4 text-primary">
              {t("footer.ABOUT_TITLE")}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {t("footer.ABOUT_DESCRIPTION")}
            </p>
            <a
              href="https://o2gardens.am"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 bg-accent text-accent-foreground font-semibold rounded-md hover:bg-accent/90 transition-colors">
              {t("footer.VISIT_BUTTON")}
            </a>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-lg font-semibold mb-4">
              {t("footer.QUICK_LINKS_TITLE")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors">
                  {t("header.NAV.HOME")}
                </Link>
              </li>
              <li>
                <Link
                  href="/halls"
                  className="text-muted-foreground hover:text-primary transition-colors">
                  {t("header.NAV.HALLS")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors">
                  {t("header.NAV.ABOUT")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors">
                  {t("header.NAV.CONTACT")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-lg font-semibold mb-4">{t("footer.CONTACT_TITLE")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <MapPin className="mt-1 flex-shrink-0" size={18} />
                <span>{t("footer.ADDRESS")}</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <Phone size={18} />
                <span>{t("footer.PHONE")}</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <Mail size={18} />
                <span>{t("footer.EMAIL")}</span>
              </li>
            </ul>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h3 className="text-lg font-semibold mb-4">
              {t("footer.SOCIAL_TITLE")}
            </h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110">
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div
          className="border-t border-border mt-8 pt-8 text-center text-muted-foreground animate-fade-in"
          style={{ animationDelay: "0.4s" }}>
          <p>
            &copy; {getCurrentYear()} O₂ Gardens Cafe. {t("footer.COPYRIGHT")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
