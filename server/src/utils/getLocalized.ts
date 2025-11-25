export const getLocalized = (obj: any, locale: string) => {
  if (!obj) return "";
  return obj[locale] || obj.en || obj.ru || obj.hy || "";
};
