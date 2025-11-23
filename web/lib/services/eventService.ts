import api from "../axiosConfig";

export interface Event {
  _id?: string;
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
  date: string;
  time: string;
  hallId: string;
  schema?: string;
  image?: string;
  price?: number;
  capacity?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface EventsResponse {
  success: boolean;
  count: number;
  data: Event[];
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
  date: string;
  time: string;
  hallId: string;
  schema?: string;
  image?: string;
  price?: number;
  capacity?: number;
}

// Get all events
export const getEvents = async (params?: {
  locale?: string;
  hallId?: string;
}): Promise<EventsResponse> => {
  const response = await api.get<EventsResponse>("/events", { params });
  return response.data;
};

// Get single event
export const getEvent = async (id: string): Promise<EventResponse> => {
  const response = await api.get<EventResponse>(`/events/${id}`);
  return response.data;
};

// Create event (admin only)
export const createEvent = async (data: CreateEventData): Promise<EventResponse> => {
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

