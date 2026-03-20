import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { getAdmin, logout } from "../../services/authService";

const TopBar = () => {
  const navigate = useNavigate();
  const admin = getAdmin();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between bg-white border-b border-gray-200 px-8 py-4">
      <div>
        <p className="text-sm text-gray-500">Welcome back</p>
        <h1 className="text-lg font-semibold text-gray-900">{admin?.name || "Admin"}</h1>
      </div>
      <Button variant="outline" onClick={handleLogout}>
        Logout
      </Button>
    </header>
  );
};

export default TopBar;
