import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

import { AUTH_KEYS } from "../app/store";

api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem(AUTH_KEYS.token)
      : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
