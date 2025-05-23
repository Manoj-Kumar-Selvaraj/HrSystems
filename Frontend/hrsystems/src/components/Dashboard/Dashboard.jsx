import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import { Routes, Route, Link } from "react-router-dom";
import EmployeeManagement from "./EmployeeManagement";
import Attendance from "./Attendance";
import Payroll from "./Payroll";
import Performance from "./Performance";
import Recruitment from "./Recruitment";
import Documents from "./Documents";

const Dashboard = () => {
  const { oktaAuth, authState } = useOktaAuth();

  const logout = async () => {
    await oktaAuth.signOut();
  };

  if (!authState?.isAuthenticated) {
    return <div>Access Denied. Please <a href="/">Login</a>.</div>;
  }

  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <h2>HR System</h2>
        <ul>
          <li><Link to="employees">Employee Management</Link></li>
          <li><Link to="attendance">Attendance</Link></li>
          <li><Link to="payroll">Payroll</Link></li>
          <li><Link to="performance">Performance</Link></li>
          <li><Link to="recruitment">Recruitment</Link></li>
          <li><Link to="documents">Documents</Link></li>
        </ul>
        <button className="logout-button" onClick={logout}>Logout</button>
      </nav>

      <div className="dashboard-content">
        <Routes>
          <Route path="employees" element={<EmployeeManagement />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="performance" element={<Performance />} />
          <Route path="recruitment" element={<Recruitment />} />
          <Route path="documents" element={<Documents />} />
          <Route path="/" element={<h2>Select a section from the sidebar</h2>} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
