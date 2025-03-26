import React, { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee } from "./api";

const EmployeeManagement = () => {
  const { authState } = useOktaAuth();
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: "", position: "", salary: "" });

  useEffect(() => {
    if (authState?.isAuthenticated) {
      fetchEmployees(authState.accessToken.accessToken)
        .then(setEmployees)
        .catch((error) => console.error("Error fetching employees:", error));
    }
  }, [authState]);

  const handleAddEmployee = async () => {
    if (!newEmployee.name || !newEmployee.position || !newEmployee.salary) {
      alert("All fields are required!");
      return;
    }
    const response = await createEmployee(authState.accessToken.accessToken, newEmployee);
    setEmployees([...employees, newEmployee]);
    setNewEmployee({ name: "", position: "", salary: "" });
    alert(response.message);
  };

  const handleDeleteEmployee = async (employeeId) => {
    const response = await deleteEmployee(authState.accessToken.accessToken, employeeId);
    setEmployees(employees.filter(emp => emp.id !== employeeId));
    alert(response.message);
  };

  return (
    <div>
      <h2>Employee Management</h2>
      
      {/* Add Employee Form */}
      <div>
        <input type="text" placeholder="Name" value={newEmployee.name} onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} />
        <input type="text" placeholder="Position" value={newEmployee.position} onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })} />
        <input type="number" placeholder="Salary" value={newEmployee.salary} onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })} />
        <button onClick={handleAddEmployee}>Add Employee</button>
      </div>

      {/* Employee List */}
      {employees.length > 0 ? (
        <ul>
          {employees.map((emp) => (
            <li key={emp.id}>
              {emp.name} - {emp.position} - ${emp.salary} 
              <button onClick={() => handleDeleteEmployee(emp.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
};

export default EmployeeManagement;
