import React, { useState, useEffect } from "react";
import axios from "axios";

const AssignedRooms = () => {
  const [assignedRooms, setAssignedRooms] = useState([]); // All assigned rooms
  const [newAssignment, setNewAssignment] = useState({
    p_id: "",
    r_id: "",
    assigned_date: "",
  }); // New assignment data
  const [editingAssignment, setEditingAssignment] = useState(null); // Assignment being edited

  // Fetch all assigned rooms when the component loads
  const fetchAssignedRooms = async () => {
    try {
      const response = await axios.get("http://localhost:3000/assigned-rooms");
      setAssignedRooms(response.data);
    } catch (error) {
      console.error("Error fetching assigned rooms:", error);
    }
  };

  useEffect(() => {
    fetchAssignedRooms();
  }, []);

  // Add a new room assignment
  const handleAddAssignment = async () => {
    try {
      await axios.post("http://localhost:3000/assigned-rooms", newAssignment);
      setNewAssignment({ p_id: "", r_id: "", assigned_date: "" }); // Clear form
      fetchAssignedRooms(); // Refresh the list
    } catch (error) {
      console.error("Error adding assignment:", error);
    }
  };

  // Edit a room assignment
  const handleEditAssignment = async (assignment_id) => {
    try {
      await axios.put(
        `http://localhost:3000/assigned-rooms/${assignment_id}`,
        editingAssignment
      );
      setEditingAssignment(null); // Exit edit mode
      fetchAssignedRooms(); // Refresh the list
    } catch (error) {
      console.error("Error updating assignment:", error);
    }
  };

  // Delete a room assignment
  const handleDeleteAssignment = async (assignment_id) => {
    try {
      await axios.delete(
        `http://localhost:3000/assigned-rooms/${assignment_id}`
      );
      fetchAssignedRooms(); // Refresh the list
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Assigned Rooms</h1>

      {/* Add Assignment Form */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Assign Room</h3>
        <input
          type="number"
          placeholder="Patient ID"
          value={newAssignment.p_id}
          onChange={(e) =>
            setNewAssignment({ ...newAssignment, p_id: e.target.value })
          }
          style={{ padding: "10px", marginRight: "10px" }}
        />
        <input
          type="number"
          placeholder="Room ID"
          value={newAssignment.r_id}
          onChange={(e) =>
            setNewAssignment({ ...newAssignment, r_id: e.target.value })
          }
          style={{ padding: "10px", marginRight: "10px" }}
        />
        <input
          type="datetime-local"
          value={newAssignment.assigned_date}
          onChange={(e) =>
            setNewAssignment({ ...newAssignment, assigned_date: e.target.value })
          }
          style={{ padding: "10px", marginRight: "10px" }}
        />
        <button onClick={handleAddAssignment}>Assign</button>
      </div>

      {/* Assigned Rooms List */}
      <ul>
        {assignedRooms.map((assignment) => (
          <li
            key={assignment.assignment_id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              listStyle: "none",
            }}
          >
            {editingAssignment &&
            editingAssignment.assignment_id === assignment.assignment_id ? (
              // Edit Mode
              <div>
                <input
                  type="number"
                  value={editingAssignment.p_id}
                  onChange={(e) =>
                    setEditingAssignment({
                      ...editingAssignment,
                      p_id: e.target.value,
                    })
                  }
                  style={{ padding: "10px", marginRight: "10px" }}
                />
                <input
                  type="number"
                  value={editingAssignment.r_id}
                  onChange={(e) =>
                    setEditingAssignment({
                      ...editingAssignment,
                      r_id: e.target.value,
                    })
                  }
                  style={{ padding: "10px", marginRight: "10px" }}
                />
                <input
                  type="datetime-local"
                  value={editingAssignment.assigned_date}
                  onChange={(e) =>
                    setEditingAssignment({
                      ...editingAssignment,
                      assigned_date: e.target.value,
                    })
                  }
                  style={{ padding: "10px", marginRight: "10px" }}
                />
                <button
                  onClick={() =>
                    handleEditAssignment(assignment.assignment_id)
                  }
                >
                  Save
                </button>
                <button onClick={() => setEditingAssignment(null)}>
                  Cancel
                </button>
              </div>
            ) : (
              // View Mode
              <div>
                <strong>Assignment ID:</strong> {assignment.assignment_id}
                <br />
                <strong>Patient Name:</strong> {assignment.patient_name || "N/A"}
                <br />
                <strong>Room Type:</strong> {assignment.room_type || "N/A"}
                <br />
                <strong>Assigned Date:</strong>{" "}
                {assignment.assigned_date || "N/A"}
                <br />
                <button
                  onClick={() => setEditingAssignment(assignment)}
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAssignment(assignment.assignment_id)}
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

export default AssignedRooms;
