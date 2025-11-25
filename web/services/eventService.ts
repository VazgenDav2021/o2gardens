import api from "@/lib/axiosConfig";
import { Event, Locale, Mode } from "@/types";



export interface EventsResponse<R extends Mode> {
  success: boolean;
  count: number;
  data: Event<R>[];
}

export interface EventResponse {
  success: boolean;
  data: Event;
}

export interface CreateEventData {
  title: {
    en: string;
    hy: string;
    ru: string;
  };
  description: {
    en: string;
    hy: string;
    ru: string;
  };
  artists: {
    en: string;
    hy: string;
    ru: string;
  };
  date: string;
  time: string;
  hall: string;
  schema?: string;
  image?: string;
  capacity?: number;
  deposit: number;
}

// Get all events
export const getEvents = async <R extends Mode>(params?: {
  locale?: Locale;
  hall?: string;
}): Promise<EventsResponse<R>> => {
  const response = await api.get<EventsResponse<R>>("/events", { params });
  return response.data;
};

// Get single event
export const getEvent = async (id: string): Promise<EventResponse> => {
  const response = await api.get<EventResponse>(`/events/${id}`);
  return response.data;
};

// Create event (admin only)
export const createEvent = async (data: Event): Promise<EventResponse> => {
  const response = await api.post<EventResponse>("/events", data);
  return response.data;
};

// Update event (admin only)
export const updateEvent = async (
  id: string,
  data: Partial<CreateEventData>
): Promise<EventResponse> => {
  const response = await api.put<EventResponse>(`/events/${id}`, data);
  return response.data;
};

// Delete event (admin only)
export const deleteEvent = async (id: string): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete<{ success: boolean; message: string }>(`/events/${id}`);
  return response.data;
};

