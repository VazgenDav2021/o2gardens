"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/ui/button";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Slide } from "@/types";
import { getImageUrl } from "@/lib/getImageUrl";

interface HeroSectionProps {
  slides: Slide[];
}

const HeroSection = ({ slides }: HeroSectionProps) => {
  const t = useTranslations();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides?.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [slides?.length]);

  return (
    <section className="pt-32 pb-20 overflow-hidden relative min-h-[600px] md:min-h-[700px] flex items-center">
      {slides?.map((img, index) => {
        const image = getImageUrl(img.url);
        console.log({ image });

        return (
          <div
            key={img.url}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000`}
            style={{
              backgroundImage: `url(${image})`,
              opacity: index === currentIndex ? 1 : 0,
              zIndex: 0,
            }}
          />
        );
      })}

      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-10"></div>

      <div className="container mx-auto text-center relative z-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl hover:scale-105 transition-transform duration-300 cursor-default">
          {t("home.hero.TITLE")}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
          {t("home.hero.DESCRIPTION")}
        </p>
        <Link href="/halls">
          <Button
            size="lg"
            className="group hover:scale-110 transition-all duration-400 hover:shadow-2xl hover:shadow-primary/50 text-primary-foreground bg-primary">
            {t("home.hero.BUTTON")}
            <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
