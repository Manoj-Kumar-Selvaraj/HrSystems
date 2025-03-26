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
    oktaAuth.signOut();
  };

  if (!authState?.isAuthenticated) {
    return <div>Access Denied. Please <a href="/">Login</a>.</div>;
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
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

      {/* Main Content */}
      <div className="dashboard-content">
        <Routes>
          <Route path="/dashboard/employees" element={<EmployeeManagement />} />
          <Route path="/dashboard/attendance" element={<Attendance />} />
          <Route path="/dashboard/payroll" element={<Payroll />} />
          <Route path="/dashboard/performance" element={<Performance />} />
          <Route path="/dashboard/recruitment" element={<Recruitment />} />
          <Route path="/dashboard/documents" element={<Documents />} />
          <Route path="/" element={<h2>Select a section from the sidebar</h2>} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
