import { Card, CardContent } from "@/ui/card";

const About = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center animate-fade-in">
          О нас
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-12 animate-fade-in">
          O₂ Cafe & Restaurant - премиальное место для незабываемых мероприятий
        </p>

        <div className="space-y-8">
          <Card className="animate-fade-in">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">
                Наша история
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                O₂ Cafe & Restaurant - это современный комплекс для проведения
                мероприятий любого уровня. Мы создали пространство, где каждая
                деталь продумана для вашего комфорта и удовольствия. Наши залы
                оснащены современным оборудованием, а профессиональная команда
                всегда готова помочь в организации идеального мероприятия.
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">
                Наши преимущества
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Три просторных зала с различной вместимостью</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Современное звуковое и световое оборудование</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Изысканная кухня и профессиональное обслуживание</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Удобная система онлайн-бронирования</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Регулярные культурные мероприятия и концерты</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">
                Наша миссия
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Мы стремимся создавать незабываемые впечатления для наших
                гостей, предоставляя высококачественный сервис и комфортную
                атмосферу. Каждое мероприятие в O₂ Cafe & Restaurant - это
                уникальный опыт, созданный с любовью и вниманием к деталям.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
