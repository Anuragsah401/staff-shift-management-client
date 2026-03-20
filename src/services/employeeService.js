import apiClient from "./apiClient";

export const fetchEmployees = async () => {
  const { data } = await apiClient.get("/admin/employees");
  return data.employees;
};

export const createEmployee = async (payload) => {
  const { data } = await apiClient.post("/admin/employees", payload);
  return data.employee;
};

export const updateEmployee = async (id, payload) => {
  const { data } = await apiClient.put(`/admin/employees/${id}`, payload);
  return data.employee;
};

export const deleteEmployee = async (id) => {
  await apiClient.delete(`/admin/employees/${id}`);
};
