import ReservationForm from "./components/ReservationForm";

interface ReservationPageProps {
  params: { tableId: string };
  searchParams: { deposit?: string; eventDate?: string };
}

export default async function ReservationPage({
  params,
  searchParams,
}: ReservationPageProps) {
  const { tableId } = params;
  const deposit = searchParams.deposit ?? null;
  const eventDate = searchParams.eventDate ?? null;

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto max-w-4xl">
        <ReservationForm
          tableId={tableId}
          eventDeposit={deposit ?? ""}
          eventDate={eventDate ?? ""}
        />
      </div>
    </main>
  );
}
