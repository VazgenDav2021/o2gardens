import api from "@/lib/axiosConfig";
import { Event, Locale, Mode } from "@/types";



export interface EventsResponse<R extends Mode> {
  success: boolean;
  count: number;
  data: Event<R>[];
}

export interface EventResponse<R extends Mode> {
  success: boolean;
  data: Event<R>;
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
export const getEvent = async <R extends Mode>(id: string): Promise<EventResponse<R>> => {
  const response = await api.get<EventResponse<R>>(`/events/${id}`);
  return response.data;
};

// Create event (admin only)
export const createEvent = async <R extends Mode>(data: Event<R>, imageFile: File): Promise<EventResponse<R>> => {
  const formData = new FormData();
  
  // Append the image file
  formData.append("image", imageFile);
  
  // Append all other fields
  formData.append("name", JSON.stringify(data.name));
  formData.append("description", JSON.stringify(data.description));
  formData.append("artists", JSON.stringify(data.artists));
  formData.append("date", data.date.toString());
  formData.append("deposit", data.deposit.toString());
  formData.append("isAdult", data.isAdult.toString());
  formData.append("hall", data.hall);
  formData.append("capacity", data.capacity.toString());
  formData.append("timeStart", data.timeStart);
  
  // Append menu items
  if (data.menu && data.menu.length > 0) {
    formData.append("menu", JSON.stringify(data.menu));
  }

  const response = await api.post<EventResponse<R>>("/events", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Update event (admin only)
export const updateEvent = async <R extends Mode>(
  id: string,
  data: Event,
  imageFile?: File
): Promise<EventResponse<R>> => {
  const formData = new FormData();
  
  // Append the image file if provided
  if (imageFile) {
    formData.append("image", imageFile);
  }
  
  // Append all other fields
  formData.append("name", JSON.stringify(data.name));
  formData.append("description", JSON.stringify(data.description));
  formData.append("artists", JSON.stringify(data.artists));
  formData.append("date", data.date.toString());
  formData.append("deposit", data.deposit.toString());
  formData.append("isAdult", data.isAdult.toString());
  formData.append("hall", data.hall);
  formData.append("capacity", data.capacity.toString());
  formData.append("timeStart", data.timeStart);
  
  // Append menu items
  if (data.menu && data.menu.length > 0) {
    formData.append("menu", JSON.stringify(data.menu));
  }

  const response = await api.put<EventResponse<R>>(`/events/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Delete event (admin only)
export const deleteEvent = async (id: string): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete<{ success: boolean; message: string }>(`/events/${id}`);
  return response.data;
};

