import React from "react";
import { Navigate } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import Dashboard from "./Dashboard/Dashboard";

const ProtectedRoute = () => {
  const { authState } = useOktaAuth();

  if (!authState || !authState.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Dashboard />;
};

export default ProtectedRoute;
