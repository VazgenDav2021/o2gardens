import api from "@/lib/axiosConfig";

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

export interface MenuItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Reservation {
  _id?: string;
  eventId?: string;
  tableId: string;
  hall: string;
  bookingType: "event" | "regular";
  contactInfo: ContactInfo;
  menuItems?: MenuItem[];
  deposit?: number;
  totalAmount: number;
  date: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt?: string;
  updatedAt?: string;
}

export interface ReservationsResponse {
  success: boolean;
  count: number;
  data: Reservation[];
}

export interface ReservationResponse {
  success: boolean;
  data: Reservation;
}

export interface CreateReservationData {
  tableId: string;
  hall: string;
  eventId?: string;
  schemaId?: string;
  bookingType: "event" | "regular";
  contactInfo: ContactInfo;
  menuItems?: MenuItem[];
  deposit?: number;
  totalAmount: number;
  date: string;
}

export interface UpdateReservationData {
  status?: "pending" | "confirmed" | "cancelled" | "completed";
  contactInfo?: ContactInfo;
  menuItems?: MenuItem[];
  deposit?: number;
  totalAmount?: number;
  date?: string;
}

// Get all reservations (admin only)
export const getReservations = async (params?: {
  eventId?: string;
  status?: string;
  date?: string;
}): Promise<ReservationsResponse> => {
  const response = await api.get<ReservationsResponse>("/reservations", { params });
  return response.data;
};

// Get single reservation (admin only)
export const getReservation = async (id: string): Promise<ReservationResponse> => {
  const response = await api.get<ReservationResponse>(`/reservations/${id}`);
  return response.data;
};

// Create reservation (public)
export const createReservation = async (
  data: CreateReservationData
): Promise<ReservationResponse> => {
  const response = await api.post<ReservationResponse>("/reservations", data);
  return response.data;
};

// Update reservation (admin only)
export const updateReservation = async (
  id: string,
  data: UpdateReservationData
): Promise<ReservationResponse> => {
  const response = await api.put<ReservationResponse>(`/reservations/${id}`, data);
  return response.data;
};

// Delete reservation (admin only)
export const deleteReservation = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete<{ success: boolean; message: string }>(
    `/reservations/${id}`
  );
  return response.data;
};

