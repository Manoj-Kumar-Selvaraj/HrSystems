import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Security, useOktaAuth } from "@okta/okta-react";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import LoginCallback from "./Login/LoginCallback";
import oktaAuth from "../oktaConfig";

const ProtectedRoute = ({ element }) => {
  const { authState } = useOktaAuth();

  if (!authState || !authState.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return element;
};

const AuthWrapper = () => {
  const navigate = useNavigate();

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    navigate(originalUri || "/dashboard"); // Redirect user after login
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login/callback" element={<LoginCallback />} />
        
        {/* Protecting /dashboard route */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      </Routes>
    </Security>
  );
};

export default AuthWrapper;
