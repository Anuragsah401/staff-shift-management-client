import axios from "axios";
import { getUserToken } from "./userAuthService";

const userApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

userApiClient.interceptors.request.use((config) => {
  const token = getUserToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default userApiClient;
