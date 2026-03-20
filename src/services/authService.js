import apiClient from "./apiClient";

const TOKEN_KEY = "adminToken";
const ADMIN_KEY = "adminInfo";

export const login = async (credentials) => {
  const { data } = await apiClient.post("/auth/login", credentials);
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(ADMIN_KEY, JSON.stringify(data.admin));
  return data.admin;
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getAdmin = () => {
  const stored = localStorage.getItem(ADMIN_KEY);
  return stored ? JSON.parse(stored) : null;
};
