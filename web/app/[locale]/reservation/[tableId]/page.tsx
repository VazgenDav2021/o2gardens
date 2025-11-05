import ReservationForm from "./components/ReservationForm";

interface ReservationPageProps {
  params: { tableId: string };
  searchParams: {
    deposit?: string;
    eventDate?: string;
    eventTimeStart?: string;
  };
}

export default async function ReservationPage({
  params,
  searchParams,
}: ReservationPageProps) {
  const { tableId } = params;
  const deposit = searchParams.deposit ?? null;
  const eventDate = searchParams.eventDate ?? null;
  const eventTimeStart = searchParams.eventTimeStart ?? null;

  return (
    <div className="container mx-auto max-w-4xl pt-32 pb-20 bg-gradient-to-b from-background to-muted/20">
      <ReservationForm
        tableId={tableId}
        eventDeposit={deposit ?? ""}
        eventDate={eventDate ?? ""}
        eventTimeStart={eventTimeStart ?? ""}
      />
    </div>
  );
}
