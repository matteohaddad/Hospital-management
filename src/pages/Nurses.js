import React, { useState, useEffect } from "react";
import axios from "axios";

const Nurses = () => {
  const [nurses, setNurses] = useState([]); // All nurses
  const [search, setSearch] = useState(""); // Search input state
  const [filteredNurses, setFilteredNurses] = useState([]); // Filtered results
  const [newNurse, setNewNurse] = useState({ emp_id: "" }); // New nurse data
  const [editingNurse, setEditingNurse] = useState(null); // Nurse being edited

  // Fetch nurses when the component loads
  const fetchNurses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/nurses");
      console.log("Fetched Nurses:", response.data); // Debugging: Log data
      setNurses(response.data);
      setFilteredNurses(response.data); // Initially show all nurses
    } catch (error) {
      console.error("Error fetching nurses:", error);
    }
  };

  useEffect(() => {
    fetchNurses();
  }, []);

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    filterNurses(e.target.value);
  };

  // Filter nurses based on search text
  const filterNurses = (searchValue) => {
    const filtered = nurses.filter((nurse) => {
      return (
        nurse.nurse_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        nurse.n_id.toString().includes(searchValue)
      );
    });
    setFilteredNurses(filtered);
  };

  // Add a new nurse
  const handleAddNurse = async () => {
    try {
      await axios.post("http://localhost:3000/nurses", newNurse);
      setNewNurse({ emp_id: "" }); // Clear form
      fetchNurses(); // Refresh the list
    } catch (error) {
      console.error("Error adding nurse:", error);
    }
  };

  // Edit a nurse
  const handleEditNurse = async (n_id) => {
    try {
      await axios.put(`http://localhost:3000/nurses/${n_id}`, editingNurse);
      setEditingNurse(null); // Exit edit mode
      fetchNurses(); // Refresh the list
    } catch (error) {
      console.error("Error updating nurse:", error);
    }
  };

  // Delete a nurse
  const handleDeleteNurse = async (n_id) => {
    try {
      await axios.delete(`http://localhost:3000/nurses/${n_id}`);
      fetchNurses(); // Refresh the list
    } catch (error) {
      console.error("Error deleting nurse:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Nurses</h1>

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

      {/* Add Nurse Form */}
      <div>
        <h3>Add New Nurse</h3>
        <input
          type="number"
          placeholder="Employee ID"
          value={newNurse.emp_id}
          onChange={(e) => setNewNurse({ emp_id: e.target.value })}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button onClick={handleAddNurse}>Add Nurse</button>
      </div>

      {/* Nurses List */}
      <ul>
        {filteredNurses.map((nurse) => (
          <li
            key={nurse.n_id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              listStyle: "none",
            }}
          >
            {editingNurse && editingNurse.n_id === nurse.n_id ? (
              // Edit Mode
              <div>
                <input
                  type="number"
                  value={editingNurse.emp_id}
                  onChange={(e) =>
                    setEditingNurse({ ...editingNurse, emp_id: e.target.value })
                  }
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
                <button onClick={() => handleEditNurse(nurse.n_id)}>Save</button>
                <button onClick={() => setEditingNurse(null)}>Cancel</button>
              </div>
            ) : (
              // View Mode
              <div>
                <strong>Nurse ID:</strong> {nurse.n_id} <br />
                <strong>Name:</strong> {nurse.nurse_name || "N/A"} <br />
                <strong>Salary:</strong> {nurse.salary || "N/A"} <br />
                <strong>Gender:</strong> {nurse.gender || "N/A"} <br />
                <strong>Mobile:</strong> {nurse.mobile || "N/A"} <br />
                <button onClick={() => setEditingNurse(nurse)}>Edit</button>
                <button onClick={() => handleDeleteNurse(nurse.n_id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nurses;
