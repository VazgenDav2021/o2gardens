import HallsSection from "../../../components/client/HallsSection";
import { getMessages } from "next-intl/server";

export default async function Halls({
  params,
}: {
  params: { locale: string };
}) {
  const messages = await getMessages({ locale: params.locale });


  return <HallsSection messages={messages} />;
}
