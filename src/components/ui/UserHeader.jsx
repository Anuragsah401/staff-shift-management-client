import React from "react";
import { LogOut } from "lucide-react";

const UserHeader = ({ userName = "John Doe", onLogout = () => {} }) => {
  const handleLogout = () => {
    console.log("User logged out");
    // Add logout logic here
  };
  return (
    <div className="sticky top-0 z-50 bg-white shadow-md flex items-center justify-between p-4 mb-8">
      <div>
        <h1 className="md:text-3xl font-bold text-gray-900">Time Entry System</h1>
        <p className="text-gray-600 mt-1">Welcome, {userName}</p>
      </div>
      <button
        onClick={onLogout}
        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition"
      >
        <LogOut size={18} />
        <span>Sign out</span>
      </button>
    </div>
  );
};

export default UserHeader;
