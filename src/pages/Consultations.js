import React, { useState, useEffect } from "react";
import axios from "axios";

const Consultations = () => {
  const [consultations, setConsultations] = useState([]); // All consultations
  const [search, setSearch] = useState(""); // Search input state
  const [filteredConsultations, setFilteredConsultations] = useState([]); // Filtered results
  const [newConsultation, setNewConsultation] = useState({
    rec_id: "",
    p_id: "",
    doc_id: "",
    r_id: "",
    consultation_datetime: "",
  }); // New consultation data
  const [editingConsultation, setEditingConsultation] = useState(null); // Consultation being edited

  // Fetch consultations when the component loads
  const fetchConsultations = async () => {
    try {
      const response = await axios.get("http://localhost:3000/consultations");
      console.log("Fetched Consultations:", response.data); // Debugging: Log data
      setConsultations(response.data);
      setFilteredConsultations(response.data); // Initially show all consultations
    } catch (error) {
      console.error("Error fetching consultations:", error);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    filterConsultations(e.target.value);
  };

  // Filter consultations based on search text
  const filterConsultations = (searchValue) => {
    const filtered = consultations.filter((consultation) => {
      return (
        consultation.patient_name
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        consultation.doctor_name
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        consultation.c_id.toString().includes(searchValue)
      );
    });
    setFilteredConsultations(filtered);
  };

  // Add a new consultation
  const handleAddConsultation = async () => {
    try {
      await axios.post("http://localhost:3000/consultations", newConsultation);
      setNewConsultation({
        rec_id: "",
        p_id: "",
        doc_id: "",
        r_id: "",
        consultation_datetime: "",
      }); // Clear form
      fetchConsultations(); // Refresh the list
    } catch (error) {
      console.error("Error adding consultation:", error);
    }
  };

  // Edit a consultation
  const handleEditConsultation = async (c_id) => {
    try {
      await axios.put(
        `http://localhost:3000/consultations/${c_id}`,
        editingConsultation
      );
      setEditingConsultation(null); // Exit edit mode
      fetchConsultations(); // Refresh the list
    } catch (error) {
      console.error("Error updating consultation:", error);
    }
  };

  // Delete a consultation
  const handleDeleteConsultation = async (c_id) => {
    try {
      await axios.delete(`http://localhost:3000/consultations/${c_id}`);
      fetchConsultations(); // Refresh the list
    } catch (error) {
      console.error("Error deleting consultation:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Consultations</h1>

      {/* Search Input */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by Patient Name, Doctor Name, or Consultation ID"
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

      {/* Add Consultation Form */}
      <div>
        <h3>Add New Consultation</h3>
        <input
          type="number"
          placeholder="Receptionist ID"
          value={newConsultation.rec_id}
          onChange={(e) =>
            setNewConsultation({ ...newConsultation, rec_id: e.target.value })
          }
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <input
          type="number"
          placeholder="Patient ID"
          value={newConsultation.p_id}
          onChange={(e) =>
            setNewConsultation({ ...newConsultation, p_id: e.target.value })
          }
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <input
          type="number"
          placeholder="Doctor ID"
          value={newConsultation.doc_id}
          onChange={(e) =>
            setNewConsultation({ ...newConsultation, doc_id: e.target.value })
          }
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <input
          type="number"
          placeholder="Room ID"
          value={newConsultation.r_id}
          onChange={(e) =>
            setNewConsultation({ ...newConsultation, r_id: e.target.value })
          }
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <input
          type="datetime-local"
          value={newConsultation.consultation_datetime}
          onChange={(e) =>
            setNewConsultation({
              ...newConsultation,
              consultation_datetime: e.target.value,
            })
          }
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button onClick={handleAddConsultation}>Add Consultation</button>
      </div>

      {/* Consultations List */}
      <ul>
        {filteredConsultations.map((consultation) => (
          <li
            key={consultation.c_id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              listStyle: "none",
            }}
          >
            {editingConsultation &&
            editingConsultation.c_id === consultation.c_id ? (
              // Edit Mode
              <div>
                <input
                  type="number"
                  value={editingConsultation.rec_id}
                  onChange={(e) =>
                    setEditingConsultation({
                      ...editingConsultation,
                      rec_id: e.target.value,
                    })
                  }
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
                <button
                  onClick={() =>
                    handleEditConsultation(consultation.c_id)
                  }
                >
                  Save
                </button>
                <button onClick={() => setEditingConsultation(null)}>
                  Cancel
                </button>
              </div>
            ) : (
              // View Mode
              <div>
                <strong>Consultation ID:</strong> {consultation.c_id} <br />
                <strong>Patient:</strong> {consultation.patient_name || "N/A"}{" "}
                <br />
                <strong>Doctor:</strong> {consultation.doctor_name || "N/A"}{" "}
                <br />
                <strong>Room Type:</strong> {consultation.room_type || "N/A"}{" "}
                <br />
                <strong>Date:</strong>{" "}
                {consultation.consultation_datetime || "N/A"} <br />
                <button
                  onClick={() => setEditingConsultation(consultation)}
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    handleDeleteConsultation(consultation.c_id)
                  }
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Consultations;
