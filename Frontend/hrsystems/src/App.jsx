import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Security, SecureRoute } from "@okta/okta-react";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import LoginCallback from "./components/Login/LoginCallback";
import oktaConfig from "./oktaConfig";

const App = () => {
  return (
    <Router>
      <Security {...oktaConfig}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login/callback" element={<LoginCallback />} />
          <Route path="/dashboard" element={<SecureRoute element={<Dashboard />} />} />
        </Routes>
      </Security>
    </Router>
  );
};

export default App;
