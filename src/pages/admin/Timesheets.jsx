import React, { useEffect, useState } from "react";
import PageHeader from "../../components/admin/PageHeader";
import { fetchTimesheets } from "../../services/timesheetService";

const Timesheets = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTimesheets = async () => {
      try {
        const data = await fetchTimesheets();
        setTimesheets(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadTimesheets();
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader title="Timesheets" subtitle="Review employee clock-in and clock-out entries." />
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Employee</th>
              <th className="px-4 py-3 text-left">Clock In</th>
              <th className="px-4 py-3 text-left">Clock Out</th>
              <th className="px-4 py-3 text-left">Hours Worked</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                  Loading timesheets...
                </td>
              </tr>
            ) : timesheets.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                  No timesheets found.
                </td>
              </tr>
            ) : (
              timesheets.map((entry) => (
                <tr key={entry.id} className="border-t border-gray-100">
                  <td className="px-4 py-3">{entry.employee || "-"}</td>
                  <td className="px-4 py-3">{entry.clock_in}</td>
                  <td className="px-4 py-3">{entry.clock_out || "-"}</td>
                  <td className="px-4 py-3">{entry.hours_worked || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timesheets;
