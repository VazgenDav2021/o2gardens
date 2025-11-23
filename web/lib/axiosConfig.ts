import axios, { AxiosError, AxiosRequestConfig } from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // Cookies are automatically sent with requests when withCredentials is true
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Cookie is automatically cleared by the server on logout
      // Redirect to login page if needed
      if (typeof window !== "undefined" && !window.location.pathname.includes("/admin-side/login")) {
        window.location.href = "/admin-side/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
