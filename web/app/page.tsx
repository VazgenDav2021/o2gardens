import HeroSection from "./components/HeroSection";
import WhyUsSection from "./components/WhyUsSection";
import HallsSection from "./components/HallsSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import EventsSection from "./components/EventsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyUsSection />
      <HallsSection />
      <EventsSection />
      <AboutSection />
      <ServicesSection />
    </>
  );
}
