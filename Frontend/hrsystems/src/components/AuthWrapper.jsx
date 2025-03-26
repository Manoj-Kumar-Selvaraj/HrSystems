import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Security } from "@okta/okta-react";
import Login from "./Login/Login";
import LoginCallback from "./Login/LoginCallback";
import ProtectedRoute from "./ProtectedRoute"; 
import oktaAuth from "../oktaConfig";

const AuthWrapper = () => {
  const navigate = useNavigate();

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    navigate(originalUri || "/dashboard");
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login/callback" element={<LoginCallback />} />
        <Route path="/dashboard/*" element={<ProtectedRoute />} />
      </Routes>
    </Security>
  );
};

export default AuthWrapper;
