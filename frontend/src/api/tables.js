import axiosInstance from "./axiosInstance";

export const getTables = async () => {
  try {
    const res = await axiosInstance.get("/tables");
    return res.data;
  } catch (error) {
    console.error("Error fetching tables:", error);
    return [];
  }
};

export const updateTable = async (id, data) => {
  try {
    const res = await axiosInstance.put(`/tables/${id}`, data);
    return res.data;
  } catch (error) {
    console.error(`Error updating table ${id}:`, error);
    throw error;
  }
};
