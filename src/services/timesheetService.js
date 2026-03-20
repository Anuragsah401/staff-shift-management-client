import apiClient from "./apiClient";

export const fetchTimesheets = async () => {
  const { data } = await apiClient.get("/admin/timesheets");
  return data.timesheets;
};
