import axios from "axios";

// In dev, Vite proxies /api -> http://localhost:5000 (see vite.config.js).
// In production, set VITE_API_URL to the deployed backend URL.
const baseURL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({ baseURL, withCredentials: true });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("briques_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("briques_token");
      localStorage.removeItem("briques_user");
    }
    return Promise.reject(err);
  }
);

export default api;
