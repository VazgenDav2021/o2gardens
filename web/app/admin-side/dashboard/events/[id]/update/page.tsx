"use client";

import { useParams } from "next/navigation";
import EventFormStepper from "../../../../../../components/admin/EventFormStepper";

export default function UpdateEventPage() {
  const params = useParams();
  const eventId = params.id as string;

  return <EventFormStepper eventId={eventId} />;
}

