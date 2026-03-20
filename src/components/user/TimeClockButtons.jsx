import React, { useState } from "react";
import { Clock, LogOut } from "lucide-react";

const TimeClockButtons = ({ checkInTime, checkOutTime, onClockIn, onClockOut }) => {
  const [status, setStatus] = useState(null);

  const handleCheckIn = async () => {
    setStatus(null);
    try {
      await onClockIn();
      setStatus("Checked in successfully.");
    } catch (error) {
      console.error(error);
      setStatus("Unable to check in.");
    }
  };

  const handleCheckOut = async () => {
    setStatus(null);
    try {
      await onClockOut();
      setStatus("Checked out successfully.");
    } catch (error) {
      console.error(error);
      setStatus("Unable to check out.");
    }
  };

  return (
    <>
      <p className="text-gray-600 mb-6">Clock in and out for your shift</p>

      {/* Check In / Check Out Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <button
          onClick={handleCheckIn}
          disabled={checkInTime !== null}
          className={`py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
            checkInTime
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          <Clock size={18} />
          Check In
        </button>
        <button
          onClick={handleCheckOut}
          disabled={!checkInTime || checkOutTime !== null}
          className={`py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
            !checkInTime || checkOutTime
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-300 text-gray-600 hover:bg-gray-400"
          }`}
        >
          <LogOut size={18} />
          Check Out
        </button>
      </div>
      {status && <p className="text-sm text-gray-600">{status}</p>}
    </>
  );
};

export default TimeClockButtons;
