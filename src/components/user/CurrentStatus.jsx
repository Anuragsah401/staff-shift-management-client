import React from "react";
import { Clock } from "lucide-react";

const CurrentStatus = ({ checkInTime }) => {
  return (
    <>
      <div className="flex items-center gap-3 mb-4 ">
        <Clock size={24} className="text-orange-500" />
        <h2 className="text-xl font-bold text-gray-900">Time Clock</h2>
      </div>
      <p className="text-gray-600 mb-6">Clock in and out for your shift</p>

      <div className="bg-amber-50 p-4 rounded-lg mb-6 flex justify-between">
        <div>
          <p className="text-gray-600 text-sm mb-1">Current Status</p>
          <p className="text-xl font-bold text-gray-900">
            {checkInTime ? "Checked In" : "Not Checked In"}
          </p>
        </div>
        <div>
          <p className="text-gray-600 text-sm mb-1">Today's Schedule</p>
          <p className="text-xl font-bold text-gray-900">09:00 - 17:00</p>
        </div>
      </div>
    </>
  );
};

export default CurrentStatus;
