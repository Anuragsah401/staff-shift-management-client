import React from "react";
import { Calendar, TrendingUp } from "lucide-react";

const MonthlyStats = () => {
  return (
    <div className="bg-white md:p-6 rounded-lg md:shadow-sm ">
      <div className="flex items-center gap-3 mb-6">
        <Calendar size={24} className="text-orange-500" />
        <h2 className="text-xl font-bold text-gray-900">This Month</h2>
      </div>
      <p className="text-gray-600 text-sm mb-6">January 2026</p>

      {/* Total Hours Worked Card */}
      <div className="bg-linear-to-br from-orange-400 to-orange-600 text-white p-6 rounded-lg mb-6">
        <p className="text-sm font-semibold mb-2">Total Hours Worked</p>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-5xl font-bold">40.1</p>
            <p className="text-sm mt-2 flex items-center gap-1">
              <TrendingUp size={16} /> On track this month
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600 text-sm mb-2">Days worked</p>
          <p className="text-3xl font-bold text-gray-900">5</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600 text-sm mb-2">Avg hours/day</p>
          <p className="text-3xl font-bold text-gray-900">8.0</p>
        </div>
      </div>
    </div>
  );
};

export default MonthlyStats;
