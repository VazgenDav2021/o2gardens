import { getMockEvents } from "@/lib/mock/getEvents";
import { EventType } from "@/types";
import EventsList from "./components/EventsList";

export default async function Events() {
  try {
    const allEvents: EventType[] = await getMockEvents("normal");

    if (allEvents.length === 0) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
          <p className="text-muted-foreground text-lg">
            Мероприятия отсутствуют.
          </p>
        </div>
      );
    }

    return <EventsList events={allEvents} />;
  } catch (error) {
    console.error("Ошибка при загрузке мероприятий:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <p className="text-red-500 text-lg">
          Не удалось загрузить мероприятия. Попробуйте позже.
        </p>
      </div>
    );
  }
}
