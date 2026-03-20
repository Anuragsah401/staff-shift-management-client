import apiClient from "./apiClient";

export const fetchLeaves = async () => {
  const { data } = await apiClient.get("/admin/leaves");
  return data.leaves;
};

export const approveLeave = async (id) => {
  const { data } = await apiClient.put(`/admin/leaves/${id}/approve`);
  return data.leave;
};

export const rejectLeave = async (id) => {
  const { data } = await apiClient.put(`/admin/leaves/${id}/reject`);
  return data.leave;
};
