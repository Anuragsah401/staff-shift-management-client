import React, { useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import PageHeader from "../../components/admin/PageHeader";
import { Button } from "../../components/ui/Button";
import { fetchEmployees } from "../../services/employeeService";
import { fetchShifts, createShift, updateShift, deleteShift } from "../../services/shiftService";

const emptyForm = {
  employee_id: "",
  date: "",
  start_time: "",
  end_time: "",
  location: "",
};

const Shifts = () => {
  const [shifts, setShifts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [shiftData, employeeData] = await Promise.all([fetchShifts(), fetchEmployees()]);
      setShifts(shiftData);
      setEmployees(employeeData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const events = useMemo(
    () =>
      shifts.map((shift) => ({
        id: String(shift.id),
        title: shift.employee_name ? `${shift.employee_name}` : `Employee #${shift.employee_id}`,
        start: `${shift.date}T${shift.start_time}`,
        end: `${shift.date}T${shift.end_time}`,
      })),
    [shifts],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (shift) => {
    setEditingId(shift.id);
    setFormData({
      employee_id: String(shift.employee_id || ""),
      date: shift.date,
      start_time: shift.start_time,
      end_time: shift.end_time,
      location: shift.location || "",
    });
  };

  const handleDelete = async (id) => {
    await deleteShift(id);
    await loadData();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...formData,
      employee_id: Number(formData.employee_id),
    };

    if (editingId) {
      await updateShift(editingId, payload);
    } else {
      await createShift(payload);
    }

    setFormData(emptyForm);
    setEditingId(null);
    await loadData();
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Shift Scheduling"
        subtitle="Manage shifts and assignments with the calendar view."
        actions={
          editingId ? (
            <Button variant="outline" onClick={resetForm}>
              Cancel Edit
            </Button>
          ) : null
        }
      />

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4"
        >
          <select
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">Select employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            type="time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            type="time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <div className="md:col-span-2 xl:col-span-5">
            <Button type="submit">{editingId ? "Update Shift" : "Add Shift"}</Button>
          </div>
        </form>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {loading ? (
          <div className="text-gray-500">Loading shifts...</div>
        ) : (
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            height={520}
            events={events}
          />
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Employee</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Start</th>
              <th className="px-4 py-3 text-left">End</th>
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shifts.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  No shifts scheduled.
                </td>
              </tr>
            ) : (
              shifts.map((shift) => (
                <tr key={shift.id} className="border-t border-gray-100">
                  <td className="px-4 py-3">{shift.employee_name || shift.employee_id}</td>
                  <td className="px-4 py-3">{shift.date}</td>
                  <td className="px-4 py-3">{shift.start_time}</td>
                  <td className="px-4 py-3">{shift.end_time}</td>
                  <td className="px-4 py-3">{shift.location || "-"}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(shift)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(shift.id)}>
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

export default Shifts;
