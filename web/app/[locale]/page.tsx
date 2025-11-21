import HeroSection from "@/components/client/HeroSection";
import WhyUsSection from "@/components/client/WhyUsSection";
import HallsSection from "@/components/client/HallsSection";
import AboutSection from "@/components/client/AboutSection";
import ServicesSection from "@/components/client/ServicesSection";
import EventsSection from "@/components/client/EventsSection";
import { getMessages } from "next-intl/server";
import { Locale } from "@/types";

interface PageProps {
  params: { locale: Locale };
}

export default async function HomePage({ params }: PageProps) {
  const messages = await getMessages({ locale: params.locale });

  return (
    <>
      <HeroSection />
      <WhyUsSection messages={messages} />
      <HallsSection messages={messages} />
      <EventsSection messages={messages} />
      <AboutSection messages={messages} />
      <ServicesSection messages={messages} />
    </>
  );
}
