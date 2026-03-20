import apiClient from "./apiClient";

export const fetchDashboard = async () => {
  const { data } = await apiClient.get("/admin/dashboard");
  return data.stats;
};
