import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthWrapper from "./components/AuthWrapper"; // New component

const App = () => {
  return (
    <Router>
      <AuthWrapper />
    </Router>
  );
};

export default App;
