import api from "./axiosConfig";

interface AdminAuthData {
  email: string;
  password: string;
}

export const loginAdmin = async (data: AdminAuthData) => {
  const res = await api.post("/admin/login", data);
  return res.data;
};

export const registerAdmin = async (data: AdminAuthData) => {
  const res = await api.post("/admin/register", data);
  return res.data;
};
