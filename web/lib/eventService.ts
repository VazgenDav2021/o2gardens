import { TableType } from "@/types";
import api from "./axiosConfig";

export interface LocalizedString {
  hy?: string;
  ru?: string;
  en?: string;
}

export interface MenuItem {
  name: LocalizedString;
  description: LocalizedString;
  Image: string;
  artists: LocalizedString;
  price: number;
}

export interface Event {
  _id?: string;
  name: LocalizedString;
  depositPerPerson: number;
  isAdult: boolean;
  description: LocalizedString;
  Image: string;
  artists: LocalizedString;
  hall?: string;
  Date: string;
  schema: TableType[];
  menu: MenuItem[];
  totalGuestQny: number;
}

// CRUD сервис для Event
export const EventService = {
  // Получить все события
  getAll: async (): Promise<Event[]> => {
    const res = await api.get("/events");
    return res.data;
  },

  // Получить событие по id
  getById: async (id: string): Promise<Event> => {
    const res = await api.get(`/events/${id}`);
    return res.data;
  },

  // Создать событие (только для админа)
  create: async (event: Event): Promise<Event> => {
    const res = await api.post("/events", event);
    return res.data;
  },

  // Обновить событие (только для админа)
  update: async (id: string, event: Event): Promise<Event> => {
    const res = await api.put(`/events/${id}`, event);
    return res.data;
  },

  // Удалить событие (только для админа)
  delete: async (id: string): Promise<{ message: string }> => {
    const res = await api.delete(`/events/${id}`);
    return res.data;
  },
};
