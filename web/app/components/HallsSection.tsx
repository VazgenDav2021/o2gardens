import { Users, ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/ui/card";
import { Button } from "@/ui/button";
import Link from "next/link";

const halls = [
  {
    id: "hall-1",
    name: "Зеленый зал",
    description: "Элегантный зал для камерных мероприятий",
    capacity: 50,
    image: "/hall-1.jpg",
  },
  {
    id: "hall-2",
    name: "Белый зал",
    description: "Просторный зал для больших торжеств",
    capacity: 150,
    image: "/hall-2.jpg",
  },
  {
    id: "hall-3",
    name: "Серебряный зал",
    description: "Универсальный зал с современным дизайном",
    capacity: 100,
    image: "/terrace.jpg",
  },
];

const HallsSection = () => (
  <section className="bg-gradient-to-b min-h-screen pt-32 pb-20">
    <div className="container mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Наши Залы
      </h2>
      <p className="text-center text-muted-foreground mb-12">
        Откройте для себя атмосферу роскоши и элегантности
      </p>
      <div className="grid md:grid-cols-3 gap-8">
        {halls.map((hall) => (
          <Card
            key={hall.id}
            className="overflow-hidden hover:shadow-xl transition-all border-border hover:border-primary">
            <img
              src={hall.image}
              alt={hall.name}
              className="h-48 w-full object-cover"
            />
            <CardHeader>
              <CardTitle className="text-2xl">{hall.name}</CardTitle>
              <CardDescription>{hall.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users size={20} />
                <span>До {hall.capacity} человек</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/halls/${hall.id}`} className="w-full">
                <Button className="w-full group">
                  Выбрать место
                  <ArrowRight
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={16}
                  />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default HallsSection;
