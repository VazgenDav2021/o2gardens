import { MultilingualString, Slide } from "@/types";
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

export interface CreateSlideData {
  url: string;
  order?: number;
}

export const getSlides = async (): Promise<SlidesResponse> => {
  try {
    const response = await api.get<SlidesResponse>("/hero/slides");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch slides:", error);
    return {
      success: false,
      count: 0,
      data: [],
    };
  }
};

// Get single slide
export const getSlide = async (id: string): Promise<SlideResponse> => {
  const response = await api.get<SlideResponse>(`/hero/slides/${id}`);
  return response.data;
};

// Create slide (admin only)
// Overload 1: With file upload
export function createSlide(file: File, order?: number): Promise<SlideResponse>;
// Overload 2: With URL string
export function createSlide(url: string, order?: number): Promise<SlideResponse>;
// Implementation
export async function createSlide(
  fileOrUrl: File | string,
  order?: number
): Promise<SlideResponse> {
  if (fileOrUrl instanceof File) {
    // Send as FormData for file upload
    const formData = new FormData();
    formData.append("image", fileOrUrl);
    if (order !== undefined) {
      formData.append("order", order.toString());
    }
    
    const response = await api.post<SlideResponse>("/hero/slides", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } else {
    // Send as JSON with URL string
    const response = await api.post<SlideResponse>("/hero/slides", {
      url: fileOrUrl,
      order,
    });
    return response.data;
  }
}

// Update slide (admin only)
// Overload 1: With file upload
export function updateSlide(id: string, file: File, order?: number): Promise<SlideResponse>;
// Overload 2: With URL string
export function updateSlide(id: string, url: string, order?: number): Promise<SlideResponse>;
// Overload 3: Without image (just order)
export function updateSlide(id: string, url: undefined, order?: number): Promise<SlideResponse>;
// Implementation
export async function updateSlide(
  id: string,
  fileOrUrl: File | string | undefined,
  order?: number
): Promise<SlideResponse> {
  if (fileOrUrl instanceof File) {
    // Send as FormData for file upload
    const formData = new FormData();
    formData.append("image", fileOrUrl);
    if (order !== undefined) {
      formData.append("order", order.toString());
    }
    
    const response = await api.put<SlideResponse>(`/hero/slides/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } else if (fileOrUrl !== undefined) {
    // Send as JSON with URL string
    const data: any = { url: fileOrUrl };
    if (order !== undefined) {
      data.order = order;
    }
    
    const response = await api.put<SlideResponse>(`/hero/slides/${id}`, data);
    return response.data;
  } else {
    // Only update order, no image change
    const data: any = {};
    if (order !== undefined) {
      data.order = order;
    }
    
    const response = await api.put<SlideResponse>(`/hero/slides/${id}`, data);
    return response.data;
  }
}

// Delete slide (admin only)
export const deleteSlide = async (id: string): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete<{ success: boolean; message: string }>(`/hero/slides/${id}`);
  return response.data;
};

