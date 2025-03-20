import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

const ProtectedRoute = () => {
  const { authState } = useOktaAuth();

  if (!authState || !authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
