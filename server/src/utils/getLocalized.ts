// Valid language codes
const VALID_LANGUAGES = ["en", "ru", "hy"] as const;
type Language = typeof VALID_LANGUAGES[number];

/**
 * Get localized string from a multi-language object
 * @param obj - Object with language keys (en, ru, hy)
 * @param locale - Optional language code (en, ru, hy)
 * @returns Localized string, full object if no locale, or empty string
 */
export const getLocalized = (obj: any, locale?: string): string | any => {
  if (!obj) return "";
  if (typeof obj !== "object") return String(obj);
  
  // If no locale or invalid locale, return the full object
  if (!locale || !VALID_LANGUAGES.includes(locale as Language)) {
    return obj;
  }

  const lang = locale as Language;
  return obj[lang] || obj.en || obj.ru || obj.hy || "";
};

/**
 * Localize a field - returns localized string if locale provided, otherwise returns full object
 * @param field - Field value (can be object with language keys or any other type)
 * @param locale - Optional language code
 * @returns Localized string if locale provided, otherwise the full field object
 */
export const localizeField = (field: any, locale?: string): any => {
  if (!field) return field;
  
  // If it's not an object with language keys, return as is
  if (typeof field !== "object" || Array.isArray(field) || field instanceof Date) {
    return field;
  }

  // Check if it's a multi-language object (has en, ru, or hy keys)
  const hasLanguageKeys = 
    typeof field.en === "string" || 
    typeof field.ru === "string" || 
    typeof field.hy === "string";

  if (!hasLanguageKeys) {
    // Not a language object, return as is
    return field;
  }

  // If no locale provided, return the full object
  if (!locale || !VALID_LANGUAGES.includes(locale as Language)) {
    return field;
  }

  // Return localized string
  const lang = locale as Language;
  return field[lang] || field.en || field.ru || field.hy || "";
};

/**
 * Localize an event object
 * @param event - Event object
 * @param locale - Optional language code
 * @returns Localized event object or full event object if no locale
 */
export const localizeEvent = (event: any, locale?: string): any => {
  if (!event) return event;

  const eventObj = event.toObject ? event.toObject() : event;


  // If no locale, return full object
  if (!locale || !VALID_LANGUAGES.includes(locale as Language)) {
    return eventObj;
  }

  
  return {
    ...eventObj,
    name: localizeField(eventObj.name, locale),
    description: localizeField(eventObj.description, locale),
    artists: localizeField(eventObj.artists, locale),
    menu: eventObj.menu?.map((item: any) => ({
      ...item,
      name: localizeField(item.name, locale),
      description: localizeField(item.description, locale),
    })) || eventObj.menu,
    hall: eventObj.hall && typeof eventObj.hall === "object" && eventObj.hall.name
      ? localizeField(eventObj.hall.name, locale)
      : eventObj.hall,
  };
};

/**
 * Localize a hall object
 * @param hall - Hall object
 * @param locale - Optional language code
 * @returns Localized hall object or full hall object if no locale
 */
export const localizeHall = (hall: any, locale?: string): any => {
  if (!hall) return hall;

  const hallObj = hall.toObject ? hall.toObject() : hall;

  // If no locale, return full object
  if (!locale || !VALID_LANGUAGES.includes(locale as Language)) {
    return hallObj;
  }

  return {
    ...hallObj,
    name: localizeField(hallObj.name, locale),
    description: localizeField(hallObj.description, locale),
  };
};
