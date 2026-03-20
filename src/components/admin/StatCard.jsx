import React from "react";

const StatCard = ({ label, value }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <p className="text-sm text-gray-500 mb-2">{label}</p>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  );
};

export default StatCard;
