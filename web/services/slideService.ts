// slideService.ts
import { Slide } from "@/types";
import api from "@/lib/axiosConfig";

export interface SlidesResponse {
  success: boolean;
  count: number;
  data: Slide[];
}

export interface SlideResponse {
  success: boolean;
  data: Slide;
}

// Get all
export const getSlides = async (): Promise<SlidesResponse> => {
  const response = await api.get<SlidesResponse>("/hero/slides");
  return response.data;
};

// Get single
export const getSlide = async (id: string): Promise<SlideResponse> => {
  const response = await api.get<SlideResponse>(`/hero/slides/${id}`);
  return response.data;
};

// Create slide — ONLY FILE
export const createSlide = async (
  file: File,
  order?: number
): Promise<SlideResponse> => {
  const formData = new FormData();
  formData.append("image", file);
  if (order !== undefined) {
    formData.append("order", order.toString());
  }

  const response = await api.post<SlideResponse>("/hero/slides", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

// Update slide — ONLY FILE, NO URL
export const updateSlide = async (
  id: string,
  file?: File,
  order?: number
): Promise<SlideResponse> => {
  const formData = new FormData();

  if (file) formData.append("image", file);
  if (order !== undefined) formData.append("order", order.toString());

  const response = await api.put<SlideResponse>(
    `/hero/slides/${id}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data;
};

// Delete
export const deleteSlide = async (id: string) => {
  const response = await api.delete(`/hero/slides/${id}`);
  return response.data;
};
