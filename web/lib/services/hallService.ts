import api from "../axiosConfig";

export interface Table {
  _id?: string;
  number: string;
  x: number;
  y: number;
  capacity: number;
  reserved?: boolean;
  shape?: "circle" | "rectangle" | "square";
  width?: number;
  height?: number;
  radius?: number;
}

export interface Scene {
  _id?: string;
  name: string;
  image: string;
  order: number;
}

export interface HallSchema {
  _id?: string;
  name: string;
  hallId: string;
  tables: Table[];
  scenes?: Scene[];
  createdAt?: string;
  updatedAt?: string;
}

export interface HallSchemasResponse {
  success: boolean;
  data: HallSchema[];
}

export interface HallSchemaResponse {
  success: boolean;
  data: HallSchema;
}

export interface CreateHallSchemaData {
  name: string;
  hallId: string;
  tables?: Table[];
  scenes?: Scene[];
}

export interface UpdateTableData {
  number?: string;
  x?: number;
  y?: number;
  capacity?: number;
  reserved?: boolean;
  shape?: "circle" | "rectangle" | "square";
  width?: number;
  height?: number;
  radius?: number;
}

export interface AddSceneData {
  name: string;
  image: string;
  order: number;
}

// Get all hall schemas
export const getHallSchemas = async (): Promise<HallSchemasResponse> => {
  const response = await api.get<HallSchemasResponse>("/halls/schemas");
  return response.data;
};

// Get single hall schema
export const getHallSchema = async (id: string): Promise<HallSchemaResponse> => {
  const response = await api.get<HallSchemaResponse>(`/halls/schemas/${id}`);
  return response.data;
};

// Create hall schema (admin only)
export const createHallSchema = async (data: CreateHallSchemaData): Promise<HallSchemaResponse> => {
  const response = await api.post<HallSchemaResponse>("/halls/schemas", data);
  return response.data;
};

// Update hall schema (admin only)
export const updateHallSchema = async (
  id: string,
  data: Partial<CreateHallSchemaData>
): Promise<HallSchemaResponse> => {
  const response = await api.put<HallSchemaResponse>(`/halls/schemas/${id}`, data);
  return response.data;
};

// Delete hall schema (admin only)
export const deleteHallSchema = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete<{ success: boolean; message: string }>(
    `/halls/schemas/${id}`
  );
  return response.data;
};

// Add table to hall schema (admin only)
export const addTable = async (
  schemaId: string,
  tableData: Omit<Table, "_id">
): Promise<HallSchemaResponse> => {
  const response = await api.post<HallSchemaResponse>(`/halls/schemas/${schemaId}/tables`, tableData);
  return response.data;
};

// Update table in hall schema (admin only)
export const updateTable = async (
  schemaId: string,
  tableId: string,
  tableData: UpdateTableData
): Promise<HallSchemaResponse> => {
  const response = await api.put<HallSchemaResponse>(
    `/halls/schemas/${schemaId}/tables/${tableId}`,
    tableData
  );
  return response.data;
};

// Delete table from hall schema (admin only)
export const deleteTable = async (
  schemaId: string,
  tableId: string
): Promise<HallSchemaResponse> => {
  const response = await api.delete<HallSchemaResponse>(
    `/halls/schemas/${schemaId}/tables/${tableId}`
  );
  return response.data;
};

// Add scene to hall schema (admin only)
export const addScene = async (
  schemaId: string,
  sceneData: AddSceneData
): Promise<HallSchemaResponse> => {
  const response = await api.post<HallSchemaResponse>(`/halls/schemas/${schemaId}/scenes`, sceneData);
  return response.data;
};

// Delete scene from hall schema (admin only)
export const deleteScene = async (
  schemaId: string,
  sceneId: string
): Promise<HallSchemaResponse> => {
  const response = await api.delete<HallSchemaResponse>(
    `/halls/schemas/${schemaId}/scenes/${sceneId}`
  );
  return response.data;
};

