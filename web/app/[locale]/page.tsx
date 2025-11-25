import HeroSection from "@/components/client/HeroSection";
import WhyUsSection from "@/components/client/WhyUsSection";
import HallsSection from "@/components/client/HallsSection";
import AboutSection from "@/components/client/AboutSection";
import ServicesSection from "@/components/client/ServicesSection";
import EventsSection from "@/components/client/EventsSection";
import { getMessages } from "next-intl/server";
import { Hall, Locale, Slide } from "@/types";
import { getHalls, getSlides } from "@/services";

interface PageProps {
  params: { locale: Locale };
}

interface SlidesResponse {
  success: boolean;
  count: number;
  data: Slide[];
}

export default async function HomePage({ params }: PageProps) {
  const messages = await getMessages({ locale: params.locale });
  const heroSlides = await getSlides();
  const halls = await getHalls<"client">(params.locale);



  return (
    <>
      {!!heroSlides.data.length && <HeroSection slides={heroSlides.data} />}
      <WhyUsSection messages={messages} />
      {!!halls.data.length && (
        <HallsSection messages={messages} halls={halls.data} />
      )}  
      <EventsSection messages={messages} />
      <AboutSection messages={messages} />
      <ServicesSection messages={messages} />
    </>
  );
}
