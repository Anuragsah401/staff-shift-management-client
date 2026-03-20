import React, { useEffect, useState } from "react";
import PageHeader from "../../components/admin/PageHeader";
import { Button } from "../../components/ui/Button";
import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../services/employeeService";

const emptyForm = {
  name: "",
  email: "",
  password: "",
  role: "",
  department: "",
  phone: "",
};

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadEmployees = async () => {
    try {
      const data = await fetchEmployees();
      setEmployees(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (employee) => {
    setEditingId(employee.id);
    setFormData({
      name: employee.name,
      email: employee.email,
      password: "",
      role: employee.role,
      department: employee.department,
      phone: employee.phone || "",
    });
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    await loadEmployees();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = { ...formData };
    if (editingId && !payload.password) {
      delete payload.password;
    }

    if (editingId) {
      await updateEmployee(editingId, payload);
    } else {
      await createEmployee(payload);
    }

    setFormData(emptyForm);
    setEditingId(null);
    await loadEmployees();
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Employee Management"
        subtitle="Add, edit, and manage workforce records."
        actions={
          editingId ? (
            <Button variant="outline" onClick={resetForm}>
              Cancel Edit
            </Button>
          ) : null
        }
      />

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-lg p-6 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full name"
            required
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            required
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={editingId ? "New password (optional)" : "Password"}
            type="password"
            required={!editingId}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role"
            required
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
            required
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <Button type="submit">{editingId ? "Update Employee" : "Add Employee"}</Button>
      </form>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  Loading employees...
                </td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  No employees yet.
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr key={employee.id} className="border-t border-gray-100">
                  <td className="px-4 py-3">{employee.name}</td>
                  <td className="px-4 py-3">{employee.email}</td>
                  <td className="px-4 py-3">{employee.role}</td>
                  <td className="px-4 py-3">{employee.department}</td>
                  <td className="px-4 py-3">{employee.phone || "-"}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(employee)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(employee.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;
