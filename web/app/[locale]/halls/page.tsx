import { getHalls } from "@/services";
import HallsSection from "../../../components/client/HallsSection";
import { getMessages } from "next-intl/server";
import { Locale } from "@/types";

export default async function Halls({
  params,
}: {
  params: { locale: Locale };
}) {
  const messages = await getMessages({ locale: params.locale });
  const halls = await getHalls<"client">(params.locale);

  return <HallsSection messages={messages} halls={halls.data} />;
}
