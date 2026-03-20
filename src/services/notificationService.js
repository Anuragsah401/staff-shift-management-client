import apiClient from "./apiClient";

export const sendNotification = async (payload) => {
  const { data } = await apiClient.post("/admin/notifications", payload);
  return data.notification;
};
