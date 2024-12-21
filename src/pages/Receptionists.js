import React, { useState, useEffect } from "react";
import axios from "axios";

const Receptions = () => {
  const [receptions, setReceptions] = useState([]); // All receptionists
  const [search, setSearch] = useState(""); // Search input state
  const [filteredReceptions, setFilteredReceptions] = useState([]); // Filtered results
  const [newReception, setNewReception] = useState({ emp_id: "" }); // New receptionist data
  const [editingReception, setEditingReception] = useState(null); // Receptionist being edited

  // Fetch receptionists when the component loads
  const fetchReceptions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/receptions");
      console.log("Fetched Receptions:", response.data); // Debugging: Log data
      setReceptions(response.data);
      setFilteredReceptions(response.data); // Initially show all receptionists
    } catch (error) {
      console.error("Error fetching receptions:", error);
    }
  };

  useEffect(() => {
    fetchReceptions();
  }, []);

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    filterReceptions(e.target.value);
  };

  // Filter receptionists based on search text
  const filterReceptions = (searchValue) => {
    const filtered = receptions.filter((reception) => {
      return (
        reception.receptionist_name
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        reception.rec_id.toString().includes(searchValue)
      );
    });
    setFilteredReceptions(filtered);
  };

  // Add a new receptionist
  const handleAddReception = async () => {
    try {
      await axios.post("http://localhost:3000/receptions", newReception);
      setNewReception({ emp_id: "" }); // Clear form
      fetchReceptions(); // Refresh the list
    } catch (error) {
      console.error("Error adding receptionist:", error);
    }
  };

  // Edit a receptionist
  const handleEditReception = async (rec_id) => {
    try {
      await axios.put(
        `http://localhost:3000/receptions/${rec_id}`,
        editingReception
      );
      setEditingReception(null); // Exit edit mode
      fetchReceptions(); // Refresh the list
    } catch (error) {
      console.error("Error updating receptionist:", error);
    }
  };

  // Delete a receptionist
  const handleDeleteReception = async (rec_id) => {
    try {
      await axios.delete(`http://localhost:3000/receptions/${rec_id}`);
      fetchReceptions(); // Refresh the list
    } catch (error) {
      console.error("Error deleting receptionist:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Receptionists</h1>

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

      {/* Add Reception Form */}
      <div>
        <h3>Add New Receptionist</h3>
        <input
          type="number"
          placeholder="Employee ID"
          value={newReception.emp_id}
          onChange={(e) =>
            setNewReception({ emp_id: e.target.value })
          }
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button onClick={handleAddReception}>Add Receptionist</button>
      </div>

      {/* Receptions List */}
      <ul>
        {filteredReceptions.map((reception) => (
          <li
            key={reception.rec_id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              listStyle: "none",
            }}
          >
            {editingReception && editingReception.rec_id === reception.rec_id ? (
              // Edit Mode
              <div>
                <input
                  type="number"
                  value={editingReception.emp_id}
                  onChange={(e) =>
                    setEditingReception({
                      ...editingReception,
                      emp_id: e.target.value,
                    })
                  }
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
                <button onClick={() => handleEditReception(reception.rec_id)}>
                  Save
                </button>
                <button onClick={() => setEditingReception(null)}>
                  Cancel
                </button>
              </div>
            ) : (
              // View Mode
              <div>
                <strong>Receptionist ID:</strong> {reception.rec_id} <br />
                <strong>Name:</strong> {reception.receptionist_name || "N/A"}{" "}
                <br />
                <strong>Salary:</strong> {reception.salary || "N/A"} <br />
                <strong>Gender:</strong> {reception.gender || "N/A"} <br />
                <strong>Mobile:</strong> {reception.mobile || "N/A"} <br />
                <button onClick={() => setEditingReception(reception)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteReception(reception.rec_id)}>
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

export default Receptions;
