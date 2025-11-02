import { Calendar as CalendarIcon, MapPin, Users } from "lucide-react";

const WhyUsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Почему выбирают нас
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-card border border-border hover:border-primary transition-all hover:shadow-2xl hover:shadow-primary/20 group hover:-translate-y-2 duration-500 cursor-pointer">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-125 transition-all duration-500">
              <CalendarIcon className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Гибкое бронирование</h3>
            <p className="text-muted-foreground">
              Выбирайте удобную дату и время для вашего мероприятия
            </p>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border hover:border-primary transition-all hover:shadow-2xl hover:shadow-primary/20 group hover:-translate-y-2 duration-500 cursor-pointer">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-125 transition-all duration-500">
              <MapPin className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">3 просторных зала</h3>
            <p className="text-muted-foreground">
              Выберите подходящий зал для вашего мероприятия
            </p>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border hover:border-primary transition-all hover:shadow-2xl hover:shadow-primary/20 group hover:-translate-y-2 duration-500 cursor-pointer">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-125 transition-all duration-500">
              <Users className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Индивидуальный подход
            </h3>
            <p className="text-muted-foreground">
              Профессиональное обслуживание и внимание к деталям
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
