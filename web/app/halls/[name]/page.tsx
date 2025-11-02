import { EventType } from "@/types";
import { getMockEvents } from "@/lib/mock/getEvents";
import EventBooking from "./components/EventBooking";

interface EventPageProps {
  params: { name: string };
}

export default async function EventPage({ params }: EventPageProps) {
  const hallId = params.name;

  let allEvents: EventType[] = [];
  let error: string | null = null;

  try {
    allEvents = await getMockEvents("normal");
  } catch (err) {
    console.error("Ошибка при загрузке мероприятий:", err);
    error = "Не удалось загрузить мероприятия. Попробуйте позже.";
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (allEvents.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <p className="text-muted-foreground text-lg">
          Мероприятия отсутствуют.
        </p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center animate-fade-in">
          Бронирование столика
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-8 animate-fade-in">
          Выберите тип бронирования и дату
        </p>
        <EventBooking allEvents={allEvents} hallId={hallId} />
      </div>
    </div>
  );
}
