import React from "react";
import { useNavigate } from "react-router-dom";
import UserLayout from "components/user/UserLayout";
import UserHeader from "components/ui/UserHeader";
import { getUserInfo, logoutUser } from "../../services/userAuthService";

const User = () => {
  const navigate = useNavigate();
  const userInfo = getUserInfo();

  const handleLogout = () => {
    logoutUser();
    navigate("/user/login");
  };

  return (
    <>
      <UserHeader userName={userInfo?.name || "Employee"} onLogout={handleLogout} />
      <UserLayout />
    </>
  );
};

export default User;
