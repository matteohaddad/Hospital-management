import React, { useState, useEffect } from "react";
import axios from "axios";

const Employees = () => {
  const [employees, setEmployees] = useState([]); // All employees
  const [search, setSearch] = useState(""); // Search input state
  const [filteredEmployees, setFilteredEmployees] = useState([]); // Filtered results
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    salary: "",
    gender: "",
    mobile: "",
  }); // New employee data
  const [editingEmployee, setEditingEmployee] = useState(null); // Employee being edited

  // Fetch employees when the component loads
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3000/employees");
        setEmployees(response.data);
        setFilteredEmployees(response.data); // Initially show all employees
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    // Filter employees based on name or ID
    const filtered = employees.filter((employee) =>
      employee.name.toLowerCase().includes(value.toLowerCase()) ||
      employee.emp_id.toString().includes(value)
    );
    setFilteredEmployees(filtered);
  };

  // Add a new employee
  const handleAddEmployee = async () => {
    try {
      const response = await axios.post("http://localhost:3000/employees", newEmployee);
      setEmployees([...employees, { ...newEmployee, emp_id: response.data.id }]);
      setFilteredEmployees([...filteredEmployees, { ...newEmployee, emp_id: response.data.id }]);
      setNewEmployee({ name: "", salary: "", gender: "", mobile: "" }); // Clear form
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  // Edit an employee
  const handleEditEmployee = async (emp_id) => {
    try {
      await axios.put(`http://localhost:3000/employees/${emp_id}`, editingEmployee);
      const updatedEmployees = employees.map((employee) =>
        employee.emp_id === emp_id ? editingEmployee : employee
      );
      setEmployees(updatedEmployees);
      setFilteredEmployees(updatedEmployees);
      setEditingEmployee(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  // Delete an employee
  const handleDeleteEmployee = async (emp_id) => {
    try {
      await axios.delete(`http://localhost:3000/employees/${emp_id}`);
      const updatedEmployees = employees.filter((employee) => employee.emp_id !== emp_id);
      setEmployees(updatedEmployees);
      setFilteredEmployees(updatedEmployees);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Employees</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by ID or Name"
        value={search}
        onChange={handleSearchChange}
        style={{
          marginBottom: "20px",
          padding: "10px",
          width: "300px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {/* Add Employee Form */}
      <div>
        <h3>Add New Employee</h3>
        <input
          type="text"
          placeholder="Name"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Salary"
          value={newEmployee.salary}
          onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
        />
        <input
          type="text"
          placeholder="Gender (M/F)"
          value={newEmployee.gender}
          onChange={(e) => setNewEmployee({ ...newEmployee, gender: e.target.value })}
        />
        <input
          type="text"
          placeholder="Mobile"
          value={newEmployee.mobile}
          onChange={(e) => setNewEmployee({ ...newEmployee, mobile: e.target.value })}
        />
        <button onClick={handleAddEmployee}>Add Employee</button>
      </div>

      {/* Employees List */}
      <ul>
        {filteredEmployees.map((employee) => (
          <li
            key={employee.emp_id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              listStyle: "none",
            }}
          >
            {editingEmployee && editingEmployee.emp_id === employee.emp_id ? (
              // Edit Mode
              <div>
                <input
                  type="text"
                  value={editingEmployee.name}
                  onChange={(e) =>
                    setEditingEmployee({ ...editingEmployee, name: e.target.value })
                  }
                />
                <input
                  type="number"
                  value={editingEmployee.salary}
                  onChange={(e) =>
                    setEditingEmployee({ ...editingEmployee, salary: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={editingEmployee.gender}
                  onChange={(e) =>
                    setEditingEmployee({ ...editingEmployee, gender: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={editingEmployee.mobile}
                  onChange={(e) =>
                    setEditingEmployee({ ...editingEmployee, mobile: e.target.value })
                  }
                />
                <button onClick={() => handleEditEmployee(employee.emp_id)}>Save</button>
                <button onClick={() => setEditingEmployee(null)}>Cancel</button>
              </div>
            ) : (
              // View Mode
              <div>
                <strong>ID:</strong> {employee.emp_id} <br />
                <strong>Name:</strong> {employee.name} <br />
                <strong>Salary:</strong> {employee.salary} <br />
                <strong>Gender:</strong> {employee.gender} <br />
                <strong>Mobile:</strong> {employee.mobile} <br />
                <button onClick={() => setEditingEmployee(employee)}>Edit</button>
                <button onClick={() => handleDeleteEmployee(employee.emp_id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Employees;
