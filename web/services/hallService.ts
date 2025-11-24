import api from "@/lib/axiosConfig";
import { Hall, Locale, Mode } from "@/types";

export interface Table {
  _id?: string;
  x: number;
  y: number;
  seats: number;
  reserved?: boolean;
}

export interface Scene {
  _id?: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DateRange {
  startDate: string | Date;
  endDate: string | Date;
}

export interface HallSchema {
  _id?: string;
  dateRange: DateRange;
  tables: Table[];
  scenes: Scene[];
}

export interface HallsResponse<R extends Mode> {
  success: boolean;
  count: number;
  data: Hall<R>[];
}

export interface HallResponse {
  success: boolean;
  data: Hall;
}

export interface CreateHallData {
  name: {
    en?: string;
    ru?: string;
    hy?: string;
  };
  description: {
    en?: string;
    ru?: string;
    hy?: string;
  };
  capacity: number;
  image?: string;
  schemas?: HallSchema[];
}

export interface UpdateTableData {
  x?: number;
  y?: number;
  seats?: number;
  reserved?: boolean;
}

export interface AddSceneData {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const getHalls = async <R extends Mode>(
  locale?: Locale
): Promise<HallsResponse<R>> => {
  try {
    const response = await api.get<HallsResponse<R>>("/halls", {
      params: {
        locale,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch halls:", error);
    return {
      success: false,
      count: 0,
      data: [],
    };
  }
};

// Get single hall
export const getHall = async (id: string): Promise<HallResponse> => {
  const response = await api.get<HallResponse>(`/halls/${id}`);
  return response.data;
};

// Create hall (admin only)
// Overload 1: With file upload
export function createHall(
  file: File,
  data: Omit<CreateHallData, "image">
): Promise<HallResponse>;
// Overload 2: With URL string
export function createHall(data: CreateHallData): Promise<HallResponse>;
// Implementation
export async function createHall(
  fileOrData: File | CreateHallData,
  data?: Omit<CreateHallData, "image">
): Promise<HallResponse> {
  if (fileOrData instanceof File) {
    // Send as FormData for file upload
    const formData = new FormData();
    formData.append("image", fileOrData);
    if (data) {
      formData.append("name", JSON.stringify(data.name));
      formData.append("description", JSON.stringify(data.description));
      formData.append("capacity", data.capacity.toString());
      if (data.schemas) {
        formData.append("schemas", JSON.stringify(data.schemas));
      }
    }

    const response = await api.post<HallResponse>("/halls", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } else {
    // Send as JSON with URL string or no image
    const response = await api.post<HallResponse>("/halls", fileOrData);
    return response.data;
  }
}

// Update hall (admin only)
// Overload 1: With file upload
export function updateHall(
  id: string,
  file: File,
  data: Partial<Omit<CreateHallData, "image">>
): Promise<HallResponse>;
// Overload 2: With URL string or no image change
export function updateHall(
  id: string,
  data: Partial<CreateHallData>
): Promise<HallResponse>;
// Implementation
export async function updateHall(
  id: string,
  fileOrData: File | Partial<CreateHallData>,
  data?: Partial<Omit<CreateHallData, "image">>
): Promise<HallResponse> {
  if (fileOrData instanceof File) {
    // Send as FormData for file upload
    const formData = new FormData();
    formData.append("image", fileOrData);
    if (data) {
      if (data.name) formData.append("name", JSON.stringify(data.name));
      if (data.description)
        formData.append("description", JSON.stringify(data.description));
      if (data.capacity !== undefined)
        formData.append("capacity", data.capacity.toString());
      if (data.schemas)
        formData.append("schemas", JSON.stringify(data.schemas));
    }

    const response = await api.put<HallResponse>(`/halls/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } else {
    // Send as JSON
    const response = await api.put<HallResponse>(`/halls/${id}`, fileOrData);
    return response.data;
  }
}

// Delete hall (admin only)
export const deleteHall = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete<{ success: boolean; message: string }>(
    `/halls/${id}`
  );
  return response.data;
};

// Add schema to hall (admin only)
export const addSchema = async (
  hallId: string,
  schemaData: { dateRange: DateRange; tables?: Table[]; scenes?: Scene[] }
): Promise<HallResponse> => {
  const response = await api.post<HallResponse>(
    `/halls/${hallId}/schemas`,
    schemaData
  );
  return response.data;
};

// Update schema in hall (admin only)
export const updateSchema = async (
  hallId: string,
  schemaId: string,
  schemaData: { dateRange?: DateRange; tables?: Table[]; scenes?: Scene[] }
): Promise<HallResponse> => {
  const response = await api.put<HallResponse>(
    `/halls/${hallId}/schemas/${schemaId}`,
    schemaData
  );
  return response.data;
};

// Delete schema from hall (admin only)
export const deleteSchema = async (
  hallId: string,
  schemaId: string
): Promise<HallResponse> => {
  const response = await api.delete<HallResponse>(
    `/halls/${hallId}/schemas/${schemaId}`
  );
  return response.data;
};

// Add table to hall schema (admin only)
export const addTable = async (
  hallId: string,
  schemaId: string,
  tableData: { x: number; y: number; seats: number }
): Promise<HallResponse> => {
  const response = await api.post<HallResponse>(
    `/halls/${hallId}/schemas/${schemaId}/tables`,
    tableData
  );
  return response.data;
};

// Update table in hall schema (admin only)
export const updateTable = async (
  hallId: string,
  schemaId: string,
  tableId: string,
  tableData: UpdateTableData
): Promise<HallResponse> => {
  const response = await api.put<HallResponse>(
    `/halls/${hallId}/schemas/${schemaId}/tables/${tableId}`,
    tableData
  );
  return response.data;
};

// Delete table from hall schema (admin only)
export const deleteTable = async (
  hallId: string,
  schemaId: string,
  tableId: string
): Promise<HallResponse> => {
  const response = await api.delete<HallResponse>(
    `/halls/${hallId}/schemas/${schemaId}/tables/${tableId}`
  );
  return response.data;
};

// Add scene to hall schema (admin only)
export const addScene = async (
  hallId: string,
  schemaId: string,
  sceneData: AddSceneData
): Promise<HallResponse> => {
  const response = await api.post<HallResponse>(
    `/halls/${hallId}/schemas/${schemaId}/scenes`,
    sceneData
  );
  return response.data;
};

// Delete scene from hall schema (admin only)
export const deleteScene = async (
  hallId: string,
  schemaId: string,
  sceneId: string
): Promise<HallResponse> => {
  const response = await api.delete<HallResponse>(
    `/halls/${hallId}/schemas/${schemaId}/scenes/${sceneId}`
  );
  return response.data;
};
