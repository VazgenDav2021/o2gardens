import { AbstractIntlMessages } from "next-intl";
export type Locale = "en" | "ru" | "hy";

export interface EventType {
  id: string;
  title: string;
  date: number;
  dateISO: string;
  time: string;
  hall: string;
  hallId: string;
  capacity: number;
  description: string;
  artists: string[];
  deposit: number;
  image: string;
  status: string;
  timeStart: string;
  timeEnd: string;
}

export interface TableType {
  _id: string;
  x: number;
  y: number;
  capacity: number;
  name: string;
  status: "available" | "reserved";
}


export type TableStatus = "available" | "reserved" | "selected";

export interface SectionProps {
  messages: AbstractIntlMessages;
}

export type EventEnum = "regular" | "event";

export interface MultilangText {
  ru: string;
  en: string;
  hy: string;
}