import apiClient from "./apiClient";

export const fetchShifts = async () => {
  const { data } = await apiClient.get("/admin/shifts");
  return data.shifts;
};

export const createShift = async (payload) => {
  const { data } = await apiClient.post("/admin/shifts", payload);
  return data.shift;
};

export const updateShift = async (id, payload) => {
  const { data } = await apiClient.put(`/admin/shifts/${id}`, payload);
  return data.shift;
};

export const deleteShift = async (id) => {
  await apiClient.delete(`/admin/shifts/${id}`);
};
