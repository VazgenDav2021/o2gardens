/**
 * Parse JSON strings from FormData (multer sends them as strings)
 * @param field - Field value from FormData
 * @returns Parsed object or original value
 */
export const parseFormDataField = (field: unknown): unknown => {
  if (typeof field === "string") {
    try {
      return JSON.parse(field);
    } catch {
      return field;
    }
  }
  return field;
};

/**
 * Parse multiple FormData fields at once
 * @param fields - Object with field names and values
 * @returns Object with parsed values
 */
export const parseFormDataFields = <T extends Record<string, unknown>>(
  fields: T
): T => {
  const parsed: Record<string, unknown> = {};
  
  for (const [key, value] of Object.entries(fields)) {
    parsed[key] = parseFormDataField(value);
  }
  
  return parsed as T;
};

/**
 * Convert string to number, handling various formats
 * @param value - Value to convert
 * @param defaultValue - Default value if conversion fails
 * @returns Number or default value
 */
export const parseNumber = (
  value: unknown,
  defaultValue: number = 0
): number => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return isNaN(parsed) ? defaultValue : parsed;
  }
  return defaultValue;
};

/**
 * Convert string to boolean, handling various formats
 * @param value - Value to convert
 * @returns Boolean value
 */
export const parseBoolean = (value: unknown): boolean => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    return value === "true" || value === "1";
  }
  return false;
};

/**
 * Parse date from timestamp (number) or date string
 * @param value - Timestamp or date string
 * @returns Date object
 */
export const parseDate = (value: unknown): Date => {
  if (value instanceof Date) return value;
  if (typeof value === "number") return new Date(value);
  if (typeof value === "string") {
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      return new Date(numValue);
    }
    return new Date(value);
  }
  return new Date();
};

