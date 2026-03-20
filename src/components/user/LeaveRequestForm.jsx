import React, { useState } from "react";
import { Button } from "../ui/Button";

const LeaveRequestForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    reason: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);
    try {
      await onSubmit({
        ...formData,
      });
      setStatus("Leave request submitted.");
      setFormData({ start_date: "", end_date: "", reason: "" });
    } catch (error) {
      console.error(error);
      setStatus("Failed to submit leave request.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Request Leave</h2>
      <p className="text-gray-600 text-sm mb-4">Submit a leave request for approval.</p>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        <input
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          placeholder="Reason"
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        <div className="md:col-span-3">
          <Button type="submit">Submit Request</Button>
        </div>
      </form>
      {status && <p className="text-sm text-gray-600 mt-3">{status}</p>}
    </div>
  );
};

export default LeaveRequestForm;
