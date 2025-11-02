import { ContactForm } from "./components/ContactForm";
import { contactItems } from "@/constants";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/ui/card";

const Contact = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20 animate-slide-in-from-top">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
              Свяжитесь с нами
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Готовы ответить на все ваши вопросы и помочь организовать
            незабываемое мероприятие
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <div className="space-y-6 animate-slide-in-from-right">
            {contactItems.map((item) => (
              <Card
                key={item.title}
                className="border-2 border-primary/20 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(0,119,60,0.2)] transition-all duration-700">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {item.info}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="animate-slide-in-from-bottom">
          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-1000">
            <CardHeader>
              <CardTitle className="text-2xl">Наше расположение</CardTitle>
              <CardDescription>Найдите нас на карте Еревана</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="w-full h-[500px] rounded-b-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.7426251665896!2d44.511481!3d40.183333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDExJzAwLjAiTiA0NMKwMzAnNDAuMSJF!5e0!3m2!1sru!2s!4v1234567890!5m2!1sru!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="O2 Gardens Location"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
