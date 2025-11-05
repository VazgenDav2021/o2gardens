import { useTranslations } from "next-intl";
import SummaryCard from "./SummaryCard";

export default function Step4Confirmation({
  formData,
  tableId,
  bookingType,
  totalGuests,
  totalAmount,
}: Props) {
  const t = useTranslations("common.halls");

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">{t("CONFIRMATION_TITLE")}</h2>

      <SummaryCard title={t("SUMMARY_BOOKING_DETAILS")}>
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t("TABLE")}:</span>
          <span className="font-medium">{tableId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t("TYPE")}:</span>
          <span className="font-medium">
            {bookingType === "event" ? t("EVENT") : t("REGULAR_DAY")}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t("DATE")}:</span>
          <span className="font-medium">{formData.date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t("TIME")}:</span>
          <span className="font-medium">{formData.time}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t("ADULTS")}:</span>
          <span className="font-medium">{formData.adults}</span>
        </div>
        {bookingType === "event" && formData.children4to10 > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("CHILDREN_4_10")}:</span>
            <span className="font-medium">{formData.children4to10}</span>
          </div>
        )}
        {bookingType === "event" && formData.childrenUnder4 > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {t("CHILDREN_UNDER_4")}:
            </span>
            <span className="font-medium">{formData.childrenUnder4}</span>
          </div>
        )}
        <div className="flex justify-between font-semibold pt-2 border-t">
          <span className="text-muted-foreground">{t("TOTAL_GUESTS")}:</span>
          <span className="font-medium">{totalGuests}</span>
        </div>
      </SummaryCard>
    </div>
  );
}
