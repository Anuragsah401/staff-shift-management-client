import React, { useState } from "react";
import PageHeader from "../../components/admin/PageHeader";
import { Button } from "../../components/ui/Button";
import { sendNotification } from "../../services/notificationService";

const Notifications = () => {
  const [formData, setFormData] = useState({ title: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);

    try {
      await sendNotification(formData);
      setStatus("Notification sent successfully.");
      setFormData({ title: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("Failed to send notification.");
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Notifications" subtitle="Send updates to your employees." />

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-lg p-6 space-y-4 max-w-2xl"
      >
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Notification title"
          required
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Notification message"
          required
          rows={4}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
        <Button type="submit">Send Notification</Button>
        {status && <p className="text-sm text-gray-600">{status}</p>}
      </form>
    </div>
  );
};

export default Notifications;
