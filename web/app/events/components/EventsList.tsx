import { Badge } from "@/ui/badge";
import { EventType } from "@/types";
import { EventTimelineItem } from "./EventTimelineItem";

interface EventsListProps {
  events: EventType[];
}

const EventsList = ({ events }: EventsListProps) => {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-slide-in-from-top">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm">
            {events.length} Мероприятий
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Все мероприятия
          </h1>
          <p className="text-lg text-muted-foreground">
            Выберите мероприятие и забронируйте место
          </p>
        </div>

        <div className="relative space-y-12 animate-fade-in">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
          {events.map((event, index) => (
            <EventTimelineItem key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsList;
