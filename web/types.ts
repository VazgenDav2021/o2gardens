export type Locale = "en" | "ru" | "hy";

export type MultilingualString = {
  [key in Locale]?: string;
};
export type DateRange = {
  startDate: Date;
  endDate: Date;
};

export type Mode = "admin" | "client";

export type BookingType = "regular" | "event";


export type Localized<T extends Mode> = T extends "admin"
  ? MultilingualString
  : string;

export interface Slide {
  _id?: string;
  url: string;
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
export interface HallSchema {
  _id?: string;
  hallId: string;
  dateRange: DateRange;
  tables: Table[];
  scenes: Scene[];
}

export interface MenuItem<T extends Mode = "admin"> {
  _id?: string;
  name: Localized<T>;
  description: Localized<T>;
  price: number;
}

export interface Event<T extends Mode = "admin"> {
  _id?: string;
  name: Localized<T>;
  description: Localized<T>;
  artists: Localized<T>;
  date: number;
  deposit: number;
  image: string;
  isAdult: boolean;
  hallId: string;
  capacity: number;
  menu: MenuItem<T>[];
  schema: HallSchema;
  timeStart: number;
}
