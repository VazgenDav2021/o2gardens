"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/ui/button";
import { useTranslations } from "next-intl";
import { Slide } from "@/types";
import { getImageUrl } from "@/lib/getImageUrl";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";

interface HeroSectionProps {
  slides: Slide[];
}

export default function HeroSection({ slides }: HeroSectionProps) {
  const t = useTranslations();

  return (
    <section className="pt-32 pb-20 overflow-hidden relative min-h-[600px] md:min-h-[700px] flex items-center">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2000 }}
        loop
        className="absolute inset-0 -z-10">
        {slides.map((img) => {
          const image = getImageUrl(img.url);
          return (
            <SwiperSlide key={img.url}>
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${image})` }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
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
}
