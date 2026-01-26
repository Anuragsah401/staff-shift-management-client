import React from "react";

const WorkHistory = () => {
  const workHistory = [
    {
      id: 1,
      date: "Sat, Jan 10, 2026",
      checkIn: "09:05",
      checkOut: "17:02",
      totalHours: "7.95h",
    },
    {
      id: 2,
      date: "Fri, Jan 9, 2026",
      checkIn: "08:58",
      checkOut: "17:10",
      totalHours: "8.20h",
    },
    {
      id: 3,
      date: "Thu, Jan 8, 2026",
      checkIn: "09:02",
      checkOut: "17:00",
      totalHours: "7.97h",
    },
    {
      id: 4,
      date: "Wed, Jan 7, 2026",
      checkIn: "09:00",
      checkOut: "16:58",
      totalHours: "7.97h",
    },
    {
      id: 5,
      date: "Tue, Jan 6, 2026",
      checkIn: "09:03",
      checkOut: "17:05",
      totalHours: "8.03h",
    },
  ];

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
            {workHistory.map((entry) => (
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
    </div>
  );
};

export default WorkHistory;
