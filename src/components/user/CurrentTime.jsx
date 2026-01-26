import React from "react";

const CurrentTime = ({ currentTime }) => {
  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-sm mb-6">
      <div className="text-center">
        <p className="text-gray-500 mb-2">
          {currentTime.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-5xl md:text-6xl font-bold text-gray-900">
          {currentTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })}
        </p>
      </div>
    </div>
  );
};

export default CurrentTime;
