import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/ui/button";

const HeroSection = () => {
  return (
    <section
      className="pt-32 pb-20 overflow-hidden relative min-h-[600px] md:min-h-[700px] flex items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(/hero-image.png)` }}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-float"></div>
      <div className="absolute top-40 right-20 w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-float-slow"></div>
      <div
        className="absolute bottom-10 left-1/3 w-40 h-40 bg-primary/10 rounded-full blur-2xl animate-float"
        style={{ animationDelay: "1s" }}></div>

      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl hover:scale-105 transition-transform duration-300 cursor-default">
          O₂ Cafe & Restaurant
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
          Премиальное место для незабываемых мероприятий и торжеств
        </p>
        <Link href="/halls">
          <Button
            size="lg"
            className="group hover:scale-110 transition-all duration-400 hover:shadow-2xl hover:shadow-primary/50 text-primary-foreground bg-primary">
            Забронировать зал
            <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
