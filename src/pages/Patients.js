import React, { useState, useEffect } from "react";
import axios from "axios";

const Patients = () => {
  const [patients, setPatients] = useState([]); // All patients
  const [search, setSearch] = useState(""); // Search input state
  const [filteredPatients, setFilteredPatients] = useState([]); // Filtered results
  const [newPatient, setNewPatient] = useState({
    name: "",
    date_of_birth: "",
    gender: "",
    mobile_number: "",
    age: "",
  }); // New patient data
  const [editingPatient, setEditingPatient] = useState(null); // Patient being edited

  // Fetch patients when the component loads
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:3000/patients");
        setPatients(response.data);
        setFilteredPatients(response.data); // Initially show all patients
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    // Filter patients based on name or ID
    const filtered = patients.filter((patient) =>
      patient.name.toLowerCase().includes(value.toLowerCase()) ||
      patient.p_id.toString().includes(value)
    );
    setFilteredPatients(filtered);
  };

  // Add a new patient
  const handleAddPatient = async () => {
    try {
      const response = await axios.post("http://localhost:3000/patients", newPatient);
      setPatients([...patients, { ...newPatient, p_id: response.data.patient_id }]);
      setFilteredPatients([...filteredPatients, { ...newPatient, p_id: response.data.patient_id }]);
      setNewPatient({ name: "", date_of_birth: "", gender: "", mobile_number: "", age: "" }); // Clear form
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  // Edit a patient
  const handleEditPatient = async (p_id) => {
    try {
      await axios.put(`http://localhost:3000/patients/${p_id}`, editingPatient);
      const updatedPatients = patients.map((patient) =>
        patient.p_id === p_id ? editingPatient : patient
      );
      setPatients(updatedPatients);
      setFilteredPatients(updatedPatients);
      setEditingPatient(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  // Delete a patient
  const handleDeletePatient = async (p_id) => {
    try {
      await axios.delete(`http://localhost:3000/patients/${p_id}`);
      const updatedPatients = patients.filter((patient) => patient.p_id !== p_id);
      setPatients(updatedPatients);
      setFilteredPatients(updatedPatients);
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Patients</h1>

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

      {/* Add Patient Form */}
      <div>
        <h3>Add New Patient</h3>
        <input
          type="text"
          placeholder="Name"
          value={newPatient.name}
          onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={newPatient.date_of_birth}
          onChange={(e) => setNewPatient({ ...newPatient, date_of_birth: e.target.value })}
        />
        <input
          type="text"
          placeholder="Gender (M/F)"
          value={newPatient.gender}
          onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
        />
        <input
          type="text"
          placeholder="Mobile"
          value={newPatient.mobile_number}
          onChange={(e) => setNewPatient({ ...newPatient, mobile_number: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={newPatient.age}
          onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
        />
        <button onClick={handleAddPatient}>Add Patient</button>
      </div>

      {/* Patients List */}
      <ul>
        {filteredPatients.map((patient) => (
          <li
            key={patient.p_id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              listStyle: "none",
            }}
          >
            {editingPatient && editingPatient.p_id === patient.p_id ? (
              // Edit Mode
              <div>
                <input
                  type="text"
                  value={editingPatient.name}
                  onChange={(e) =>
                    setEditingPatient({ ...editingPatient, name: e.target.value })
                  }
                />
                <input
                  type="date"
                  value={editingPatient.date_of_birth}
                  onChange={(e) =>
                    setEditingPatient({ ...editingPatient, date_of_birth: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={editingPatient.gender}
                  onChange={(e) =>
                    setEditingPatient({ ...editingPatient, gender: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={editingPatient.mobile_number}
                  onChange={(e) =>
                    setEditingPatient({ ...editingPatient, mobile_number: e.target.value })
                  }
                />
                <input
                  type="number"
                  value={editingPatient.age}
                  onChange={(e) =>
                    setEditingPatient({ ...editingPatient, age: e.target.value })
                  }
                />
                <button onClick={() => handleEditPatient(patient.p_id)}>Save</button>
                <button onClick={() => setEditingPatient(null)}>Cancel</button>
              </div>
            ) : (
              // View Mode
              <div>
                <strong>Patient ID:</strong> {patient.p_id} <br />
                <strong>Name:</strong> {patient.name} <br />
                <strong>Date of Birth:</strong> {patient.date_of_birth} <br />
                <strong>Gender:</strong> {patient.gender} <br />
                <strong>Mobile:</strong> {patient.mobile_number} <br />
                <strong>Age:</strong> {patient.age} <br />
                <button onClick={() => setEditingPatient(patient)}>Edit</button>
                <button onClick={() => handleDeletePatient(patient.p_id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Patients;
