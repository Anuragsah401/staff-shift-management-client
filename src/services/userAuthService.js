import apiClient from "./apiClient";

const USER_TOKEN_KEY = "userToken";
const USER_INFO_KEY = "userInfo";

export const loginUser = async (credentials) => {
  const { data } = await apiClient.post("/auth/user/login", credentials);
  localStorage.setItem(USER_TOKEN_KEY, data.token);
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(data.user));
  return data.user;
};

export const logoutUser = () => {
  localStorage.removeItem(USER_TOKEN_KEY);
  localStorage.removeItem(USER_INFO_KEY);
};

export const getUserToken = () => localStorage.getItem(USER_TOKEN_KEY);

export const getUserInfo = () => {
  const stored = localStorage.getItem(USER_INFO_KEY);
  return stored ? JSON.parse(stored) : null;
};
