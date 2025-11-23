import { EventCard } from "@/components/client/EventCard";
import { formatDate } from "@/lib/formatDate";

interface EventTimelineItemProps {
  event: any;
  index: number;
}

export const EventTimelineItem = ({ event, index }: EventTimelineItemProps) => {
  const isLeft = index % 2 === 0;

  return (
    <div
      className={`relative grid md:grid-cols-2 gap-8 items-center animate-slide-in-from-${
        isLeft ? "left" : "right"
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}>
      {isLeft ? (
        <>
          <EventCard event={event} />
          <TimelineDot />
          <TimelineDate event={event} align="left" />
        </>
      ) : (
        <>
          <TimelineDate event={event} align="right" />
          <TimelineDot />
          <EventCard event={event} />
        </>
      )}
    </div>
  );
};

const TimelineDot = () => (
  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10" />
);

const TimelineDate = ({
  event,
  align,
}: {
  event: any;
  align: "left" | "right";
}) => (
  <div
    className={`hidden md:flex ${
      align === "left" ? "justify-start" : "justify-end"
    }`}>
    <div
      className={`text-muted-foreground font-medium ${
        align === "left" ? "" : "text-right"
      }`}>
      <span className="block text-lg">{formatDate(event.date)}</span>
      <span className="block text-sm">{event.time}</span>
    </div>
  </div>
);
