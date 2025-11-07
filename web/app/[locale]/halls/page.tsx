import HallsSection from "../components/HallsSection";
import { getTranslations } from "next-intl/server";

export default async function Halls({
  params,
}: {
  params: { locale: string };
}) {
  // Dynamically import messages for the current locale
  const messages = await import(`../../../messages/${params.locale}.json`);

  return <HallsSection messages={messages} />;
}
