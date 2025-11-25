import api from "@/lib/axiosConfig";
import { Hall, Locale, Mode, Scene, Table } from "@/types";


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

export interface HallResponse<R extends Mode> {
  success: boolean;
  data: Hall<R>;
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
export const getHall = async <R extends Mode>(
  idOrName: string,
  locale?: Locale
): Promise<HallResponse<R>> => {
  const response = await api.get<HallResponse<R>>(`/halls/${idOrName}`, {
    params: {
      locale,
    },
  });
  return response.data;
};

// Create hall (admin only)
// Overload 1: With file upload
export function createHall<R extends Mode>(
  file: File,
  data: Omit<CreateHallData, "image">
): Promise<HallResponse<R>>;
// Overload 2: With URL string
export function createHall<R extends Mode>(data: CreateHallData): Promise<HallResponse<R>>;
// Implementation
export async function createHall<R extends Mode>(
  fileOrData: File | CreateHallData,
  data?: Omit<CreateHallData, "image">
): Promise<HallResponse<R>> {
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

    const response = await api.post<HallResponse<R>>("/halls", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } else {
    // Send as JSON with URL string or no image
    const response = await api.post<HallResponse<R>>("/halls", fileOrData);
    return response.data;
  }
}

// Update hall (admin only)
// Overload 1: With file upload
export function updateHall<R extends Mode>(
  id: string,
  file: File,
  data: Partial<Omit<CreateHallData, "image">>
): Promise<HallResponse<R>>;
// Overload 2: With URL string or no image change
export function updateHall<R extends Mode>(
  id: string,
  data: Partial<CreateHallData>
): Promise<HallResponse<R>>;
// Implementation
export async function updateHall<R extends Mode>(
  id: string,
  fileOrData: File | Partial<CreateHallData>,
  data?: Partial<Omit<CreateHallData, "image">>
): Promise<HallResponse<R>> {
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

    const response = await api.put<HallResponse<R>>(`/halls/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } else {
    // Send as JSON
    const response = await api.put<HallResponse<R>>(`/halls/${id}`, fileOrData);
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
export const addSchema = async <R extends Mode>(
  hallId: string,
  schemaData: { dateRange: DateRange; tables?: Table[]; scenes?: Scene[] }
): Promise<HallResponse<R>> => {
  const response = await api.post<HallResponse<R>>(
    `/halls/${hallId}/schemas`,
    schemaData
  );
  return response.data;
};

// Update schema in hall (admin only)
export const updateSchema = async <R extends Mode>(
  hallId: string,
  schemaId: string,
  schemaData: { dateRange?: DateRange; tables?: Table[]; scenes?: Scene[] }
): Promise<HallResponse<R>> => {
  const response = await api.put<HallResponse<R>>(
    `/halls/${hallId}/schemas/${schemaId}`,
    schemaData
  );
  return response.data;
};

// Delete schema from hall (admin only)
export const deleteSchema = async <R extends Mode>(
  hallId: string,
  schemaId: string
): Promise<HallResponse<R>> => {
  const response = await api.delete<HallResponse<R>>(
    `/halls/${hallId}/schemas/${schemaId}`
  );
  return response.data;
};

// Add table to hall schema (admin only)
export const addTable = async <R extends Mode>(
  hallId: string,
  schemaId: string,
  tableData: { x: number; y: number; seats: number }
): Promise<HallResponse<R>> => {
  const response = await api.post<HallResponse<R>>(
    `/halls/${hallId}/schemas/${schemaId}/tables`,
    tableData
  );
  return response.data;
};

// Update table in hall schema (admin only)
export const updateTable = async <R extends Mode>(
  hallId: string,
  schemaId: string,
  tableId: string,
  tableData: UpdateTableData
): Promise<HallResponse<R>> => {
  const response = await api.put<HallResponse<R>>(
    `/halls/${hallId}/schemas/${schemaId}/tables/${tableId}`,
    tableData
  );
  return response.data;
};

// Delete table from hall schema (admin only)
export const deleteTable = async <R extends Mode>(
  hallId: string,
  schemaId: string,
  tableId: string
): Promise<HallResponse<R>> => {
  const response = await api.delete<HallResponse<R>>(
    `/halls/${hallId}/schemas/${schemaId}/tables/${tableId}`
  );
  return response.data;
};

// Add scene to hall schema (admin only)
export const addScene = async <R extends Mode>(
  hallId: string,
  schemaId: string,
  sceneData: AddSceneData
): Promise<HallResponse<R>> => {
  const response = await api.post<HallResponse<R>>(
    `/halls/${hallId}/schemas/${schemaId}/scenes`,
    sceneData
  );
  return response.data;
};

// Delete scene from hall schema (admin only)
export const deleteScene = async <R extends Mode>(
  hallId: string,
  schemaId: string,
  sceneId: string
): Promise<HallResponse<R>> => {
  const response = await api.delete<HallResponse<R>>(
    `/halls/${hallId}/schemas/${schemaId}/scenes/${sceneId}`
  );
  return response.data;
};
