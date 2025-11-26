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
import { getTranslations } from "next-intl/server";
import { AbstractIntlMessages } from "next-intl";
import { Hall } from "@/types";

const HallsSection = async ({
  messages,
  halls: hallData,
}: {
  messages: AbstractIntlMessages;
  halls: Hall<'client'>[];
}) => {
  const t = await getTranslations(messages);
  const halls = t.raw("common.halls.LIST") as Array<{
    NAME: string;
    DESCRIPTION: string;
    CAPACITY: number;
    IMAGE: string;
    ID: string;
  }>;


  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {t("common.halls.TITLE")}
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          {t("common.halls.DESCRIPTION")}
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {hallData?.map((hall) => (
            <Card
              key={hall._id}
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
                  <span>
                    {t("common.halls.CAPACITY", { capacity: hall.capacity })}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/halls/${hall._id}`} className="w-full">
                  {/* TODO: Add booking link */}
                  {/* <Button className="w-full group">
                    {t("common.halls.BUTTON")}
                    <ArrowRight
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                      size={16}
                    />
                  </Button> */}
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HallsSection;
