import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const WeeklyOverview = () => {
  const weeklyData = [
    { week: "Week 1", hours: 40 },
    { week: "Week 2", hours: 38 },
  ];

  return (
    <div className="bg-white md:p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Weekly Hours Overview</h2>
      <p className="text-gray-600 text-sm mb-6">Your weekly hour trends</p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={weeklyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="hours" fill="#ea580c" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyOverview;
