import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Security, SecureRoute } from "@okta/okta-react";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import LoginCallback from "./components/Login/LoginCallback";
import oktaAuth from "./oktaConfig";

const App = () => {
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

export default App;
