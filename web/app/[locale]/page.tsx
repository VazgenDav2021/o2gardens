import HeroSection from "./components/HeroSection";
import WhyUsSection from "./components/WhyUsSection";
import HallsSection from "./components/HallsSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import EventsSection from "./components/EventsSection";
import { getMessages } from "next-intl/server";
import { Locale } from "@/navigation";

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
