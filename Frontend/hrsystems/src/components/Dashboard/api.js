export const API_BASE_URL = "http://127.0.0.1:8000/employees";

export const fetchEmployees = async (token, filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await fetch(`${API_BASE_URL}?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
};

export const fetchEmployeeById = async (token, employeeId) => {
  const response = await fetch(`${API_BASE_URL}/${employeeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
};

export const createEmployee = async (token, employeeData) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(employeeData),
  });
  return response.json();
};

export const updateEmployee = async (token, employeeId, updatedData) => {
  const response = await fetch(`${API_BASE_URL}/${employeeId}`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(updatedData),
  });
  return response.json();
};

export const deleteEmployee = async (token, employeeId) => {
  const response = await fetch(`${API_BASE_URL}/${employeeId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
};
