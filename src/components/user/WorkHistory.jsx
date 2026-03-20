import React from "react";

const WorkHistory = ({ entries }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Work History</h2>
      <p className="text-gray-600 text-sm mb-6">Your recent time entries</p>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-max md:w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="pb-4 px-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                Date
              </th>
              <th className="pb-4 px-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                Check In
              </th>
              <th className="pb-4 px-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                Check Out
              </th>
              <th className="pb-4 px-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                Total Hours
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4 text-sm text-gray-900 whitespace-nowrap">{entry.date}</td>
                <td className="py-4 px-4 text-sm text-gray-900 whitespace-nowrap">
                  {entry.checkIn}
                </td>
                <td className="py-4 px-4 text-sm text-gray-900 whitespace-nowrap">
                  {entry.checkOut}
                </td>
                <td className="py-4 px-4 text-sm text-gray-900 font-semibold whitespace-nowrap">
                  {entry.totalHours}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {entries.length === 0 && <p className="text-sm text-gray-500 mt-4">No time entries yet.</p>}
    </div>
  );
};

export default WorkHistory;
