/**
 * Shared types between server and client
 */

export type Locale = "en" | "ru" | "hy";

export interface MultilingualString {
  en?: string;
  ru?: string;
  hy?: string;
}

export interface Table {
  _id?: string;
  x: number;
  y: number;
  seats: number;
  reserved: boolean;
}

export interface Scene {
  _id?: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DateRange {
  startDate: Date | number; // Timestamp
  endDate: Date | number; // Timestamp
}

export interface HallSchema {
  _id?: string;
  dateRange: DateRange;
  tables: Table[];
  scenes: Scene[];
}

export interface MenuItem {
  _id?: string;
  name: MultilingualString;
  description: MultilingualString;
  price: number;
}

export interface ContactInfo {
  name: string;
  phone: string;
  email: string;
}

export type BookingType = "regular" | "event";
export type ReservationStatus = "pending" | "confirmed" | "cancelled";

