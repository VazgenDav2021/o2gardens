/**
 * Convert Date to timestamp (number)
 * @param date - Date object or timestamp
 * @returns Timestamp as number
 */
export const toTimestamp = (date: Date | number): number => {
  if (typeof date === "number") return date;
  return date.getTime();
};

/**
 * Convert timestamp to Date
 * @param timestamp - Timestamp as number
 * @returns Date object
 */
export const fromTimestamp = (timestamp: number): Date => {
  return new Date(timestamp);
};

/**
 * Get current timestamp
 * @returns Current timestamp as number
 */
export const getCurrentTimestamp = (): number => {
  return Date.now();
};

/**
 * Check if value is a valid timestamp
 * @param value - Value to check
 * @returns True if valid timestamp
 */
export const isValidTimestamp = (value: unknown): boolean => {
  if (typeof value !== "number") return false;
  const date = new Date(value);
  return !isNaN(date.getTime());
};

