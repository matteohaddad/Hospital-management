import React, { useState, useEffect } from "react";
import axios from "axios";

const NurseRoom = () => {
  const [assignments, setAssignments] = useState([]); // All nurse-room assignments
  const [nurses, setNurses] = useState([]); // Available nurses
  const [rooms, setRooms] = useState([]); // Available rooms
  const [newAssignment, setNewAssignment] = useState({ n_id: "", r_id: "" }); // New assignment
  const [editingAssignment, setEditingAssignment] = useState(null); // Assignment being edited

  // Fetch assignments, nurses, and rooms on component load
  const fetchAssignments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/nurse-rooms");
      setAssignments(response.data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const fetchNurses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/nurses");
      setNurses(response.data);
    } catch (error) {
      console.error("Error fetching nurses:", error);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:3000/rooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    fetchAssignments();
    fetchNurses();
    fetchRooms();
  }, []);

  // Add a new nurse-room assignment
  const handleAddAssignment = async () => {
    try {
      await axios.post("http://localhost:3000/nurse-rooms", newAssignment);
      setNewAssignment({ n_id: "", r_id: "" }); // Reset the form
      fetchAssignments(); // Refresh the list
    } catch (error) {
      console.error("Error adding assignment:", error);
    }
  };

  // Edit an assignment
  const handleEditAssignment = async (n_id, r_id) => {
    try {
      await axios.put(`http://localhost:3000/nurse-rooms/${n_id}/${r_id}`, {
        new_r_id: editingAssignment.r_id,
      });
      setEditingAssignment(null); // Exit edit mode
      fetchAssignments(); // Refresh the list
    } catch (error) {
      console.error("Error editing assignment:", error);
    }
  };

  // Delete an assignment
  const handleDeleteAssignment = async (n_id, r_id) => {
    try {
      await axios.delete(`http://localhost:3000/nurse-rooms/${n_id}/${r_id}`);
      fetchAssignments(); // Refresh the list
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Nurse-Room Assignments</h1>

      {/* Add Assignment Form */}
      <div>
        <h3>Assign a Nurse to a Room</h3>
        <select
          value={newAssignment.n_id}
          onChange={(e) => setNewAssignment({ ...newAssignment, n_id: e.target.value })}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        >
          <option value="">Select Nurse</option>
          {nurses.map((nurse) => (
            <option key={nurse.n_id} value={nurse.n_id}>
              {nurse.nurse_name}
            </option>
          ))}
        </select>
        <select
          value={newAssignment.r_id}
          onChange={(e) => setNewAssignment({ ...newAssignment, r_id: e.target.value })}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        >
          <option value="">Select Room</option>
          {rooms.map((room) => (
            <option key={room.r_id} value={room.r_id}>
              {room.type}
            </option>
          ))}
        </select>
        <button onClick={handleAddAssignment}>Assign</button>
      </div>

      {/* Assignments List */}
      <ul>
        {assignments.map((assignment) => (
          <li
            key={`${assignment.n_id}-${assignment.r_id}`}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              listStyle: "none",
            }}
          >
            {editingAssignment &&
            editingAssignment.n_id === assignment.n_id &&
            editingAssignment.r_id === assignment.r_id ? (
              // Edit Mode
              <div>
                <select
                  value={editingAssignment.r_id}
                  onChange={(e) =>
                    setEditingAssignment({ ...editingAssignment, r_id: e.target.value })
                  }
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                >
                  {rooms.map((room) => (
                    <option key={room.r_id} value={room.r_id}>
                      {room.type}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() =>
                    handleEditAssignment(assignment.n_id, assignment.r_id)
                  }
                >
                  Save
                </button>
                <button onClick={() => setEditingAssignment(null)}>Cancel</button>
              </div>
            ) : (
              // View Mode
              <div>
                <strong>Nurse:</strong> {assignment.nurse_name} <br />
                <strong>Room:</strong> {assignment.room_type} <br />
                <button onClick={() => setEditingAssignment(assignment)}>Edit</button>
                <button
                  onClick={() =>
                    handleDeleteAssignment(assignment.n_id, assignment.r_id)
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

export default NurseRoom;
