import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Security, SecureRoute } from "@okta/okta-react";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import LoginCallback from "./Login/LoginCallback";
import oktaAuth from "../oktaConfig";

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
        <Route 
          path="/dashboard" 
          element={
            <SecureRoute>
              <Dashboard />
            </SecureRoute>
          } 
        />
      </Routes>
    </Security>
  );
};

export default AuthWrapper;
