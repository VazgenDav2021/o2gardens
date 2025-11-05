import z, { date } from "zod";

export type EventType = {
  id: string;
  title: string;
  date: string;
  dateISO: string;
  time: string;
  hall: string;
  hallId: string;
  capacity: number;
  description: string;
  artists: string[];
  deposit: number;
  image: string;
  status: "available" | "sold-out";
  timeStart: string;
  timeEnd: string;
};

export interface TableType {
  id: string;
  x: number;
  y: number;
  capacity: number;
  name: string;
  status: "available" | "reserved";
}

export const reservationSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  adults: z.number().min(1),
  children4to10: z.number().min(0),
  childrenUnder4: z.number().min(0),
  menu: z.array(z.string()).optional(),
  date: z.string().min(1),
  time: z.string().min(1),
});

export type ReservationData = z.infer<typeof reservationSchema>;
