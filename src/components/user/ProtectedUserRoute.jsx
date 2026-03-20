import React from "react";
import { Navigate } from "react-router-dom";
import { getUserToken } from "../../services/userAuthService";

const ProtectedUserRoute = ({ children }) => {
  const token = getUserToken();
  if (!token) {
    return <Navigate to="/user/login" replace />;
  }
  return children;
};

export default ProtectedUserRoute;
