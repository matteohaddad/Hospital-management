import React, { useState, useEffect } from "react";
import axios from "axios";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]); // All doctors
  const [search, setSearch] = useState(""); // Search input state
  const [filteredDoctors, setFilteredDoctors] = useState([]); // Filtered results
  const [newDoctor, setNewDoctor] = useState({ emp_id: "" }); // New doctor data
  const [editingDoctor, setEditingDoctor] = useState(null); // Doctor being edited

  // Fetch doctors when the component loads
  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:3000/doctors");
      console.log("Fetched Doctors:", response.data); // Debugging: Log data
      setDoctors(response.data);
      setFilteredDoctors(response.data); // Initially show all doctors
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    filterDoctors(e.target.value);
  };

  // Filter doctors based on search text
  const filterDoctors = (searchValue) => {
    const filtered = doctors.filter((doctor) => {
      return (
        doctor.doctor_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        doctor.doc_id.toString().includes(searchValue)
      );
    });
    setFilteredDoctors(filtered);
  };

  // Add a new doctor
  const handleAddDoctor = async () => {
    try {
      await axios.post("http://localhost:3000/doctors", newDoctor);
      setNewDoctor({ emp_id: "" }); // Clear form
      fetchDoctors(); // Refresh the list
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };

  // Edit a doctor
  const handleEditDoctor = async (doc_id) => {
    try {
      await axios.put(`http://localhost:3000/doctors/${doc_id}`, editingDoctor);
      setEditingDoctor(null); // Exit edit mode
      fetchDoctors(); // Refresh the list
    } catch (error) {
      console.error("Error updating doctor:", error);
    }
  };

  // Delete a doctor
  const handleDeleteDoctor = async (doc_id) => {
    try {
      await axios.delete(`http://localhost:3000/doctors/${doc_id}`);
      fetchDoctors(); // Refresh the list
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Doctors</h1>

      {/* Search Input */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by Name or ID"
          value={search}
          onChange={handleSearchChange}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Add Doctor Form */}
      <div>
        <h3>Add New Doctor</h3>
        <input
          type="number"
          placeholder="Employee ID"
          value={newDoctor.emp_id}
          onChange={(e) => setNewDoctor({ emp_id: e.target.value })}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button onClick={handleAddDoctor}>Add Doctor</button>
      </div>

      {/* Doctors List */}
      <ul>
        {filteredDoctors.map((doctor) => (
          <li
            key={doctor.doc_id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              listStyle: "none",
            }}
          >
            {editingDoctor && editingDoctor.doc_id === doctor.doc_id ? (
              // Edit Mode
              <div>
                <input
                  type="number"
                  value={editingDoctor.emp_id}
                  onChange={(e) =>
                    setEditingDoctor({ ...editingDoctor, emp_id: e.target.value })
                  }
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
                <button onClick={() => handleEditDoctor(doctor.doc_id)}>Save</button>
                <button onClick={() => setEditingDoctor(null)}>Cancel</button>
              </div>
            ) : (
              // View Mode
              <div>
                <strong>Doctor ID:</strong> {doctor.doc_id} <br />
                <strong>Name:</strong> {doctor.doctor_name || "N/A"} <br />
                <strong>Salary:</strong> {doctor.salary || "N/A"} <br />
                <strong>Gender:</strong> {doctor.gender || "N/A"} <br />
                <strong>Mobile:</strong> {doctor.mobile || "N/A"} <br />
                <button onClick={() => setEditingDoctor(doctor)}>Edit</button>
                <button onClick={() => handleDeleteDoctor(doctor.doc_id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Doctors;
