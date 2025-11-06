import { format } from "date-fns";

export const formatDate = (date: Date | number): string => {
  const d = typeof date === "number" ? new Date(date) : date;
  return format(d, "yyyy-MM-dd");
};
