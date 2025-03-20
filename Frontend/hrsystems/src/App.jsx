import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Security, SecureRoute } from "@okta/okta-react";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import LoginCallback from "./components/Login/LoginCallback";
import oktaAuth from "./oktaConfig"; // Ensure this is an OktaAuth instance

const App = () => {
  return (
    <Router>
      <Security oktaAuth={oktaAuth}> {/* Pass the OktaAuth instance explicitly */}
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
    </Router>
  );
};

export default App;
