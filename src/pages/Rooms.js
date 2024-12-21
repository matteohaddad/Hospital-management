import React, { useState, useEffect } from "react";
import axios from "axios";

const Rooms = () => {
  const [rooms, setRooms] = useState([]); // All rooms
  const [search, setSearch] = useState(""); // Search input state
  const [filteredRooms, setFilteredRooms] = useState([]); // Filtered results
  const [newRoom, setNewRoom] = useState({
    type: "",
    capacity: "",
    availability: true,
  }); // New room data
  const [editingRoom, setEditingRoom] = useState(null); // Room being edited

  // Fetch rooms when the component loads
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:3000/rooms");
        setRooms(response.data);
        setFilteredRooms(response.data); // Initially show all rooms
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    filterRooms(e.target.value);
  };

  // Filter rooms based on search text
  const filterRooms = (searchValue) => {
    const filtered = rooms.filter((room) => {
      return (
        room.type.toLowerCase().includes(searchValue.toLowerCase()) ||
        room.r_id.toString().includes(searchValue)
      );
    });
    setFilteredRooms(filtered);
  };

  // Add a new room
  const handleAddRoom = async () => {
    try {
      const newRoomData = {
        ...newRoom,
        availability: newRoom.availability ? 1 : 0, // Convert boolean to 1/0
      };

      const response = await axios.post("http://localhost:3000/rooms", newRoomData);
      setRooms([...rooms, { ...newRoomData, r_id: response.data.id }]);
      setFilteredRooms([...filteredRooms, { ...newRoomData, r_id: response.data.id }]);
      setNewRoom({ type: "", capacity: "", availability: true }); // Clear form
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };

  // Edit a room
  const handleEditRoom = async (r_id) => {
    try {
      const updatedRoomData = {
        ...editingRoom,
        availability: editingRoom.availability ? 1 : 0, // Convert boolean to 1/0
      };

      await axios.put(`http://localhost:3000/rooms/${r_id}`, updatedRoomData);

      const updatedRooms = rooms.map((room) =>
        room.r_id === r_id ? updatedRoomData : room
      );
      setRooms(updatedRooms);
      setFilteredRooms(updatedRooms);
      setEditingRoom(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  // Delete a room
  const handleDeleteRoom = async (r_id) => {
    try {
      await axios.delete(`http://localhost:3000/rooms/${r_id}`);
      const updatedRooms = rooms.filter((room) => room.r_id !== r_id);
      setRooms(updatedRooms);
      setFilteredRooms(updatedRooms);
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Rooms</h1>

      {/* Search Input */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by ID or Type"
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

      {/* Add Room Form */}
      <div>
        <h3>Add New Room</h3>
        <input
          type="text"
          placeholder="Type"
          value={newRoom.type}
          onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
        />
        <input
          type="number"
          placeholder="Capacity"
          value={newRoom.capacity}
          onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
        />
        <select
          value={newRoom.availability}
          onChange={(e) =>
            setNewRoom({ ...newRoom, availability: e.target.value === "true" })
          }
        >
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
        <button onClick={handleAddRoom}>Add Room</button>
      </div>

      {/* Rooms List */}
      <ul>
        {filteredRooms.map((room) => (
          <li
            key={room.r_id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              listStyle: "none",
            }}
          >
            {editingRoom && editingRoom.r_id === room.r_id ? (
              // Edit Mode
              <div>
                <input
                  type="text"
                  value={editingRoom.type}
                  onChange={(e) =>
                    setEditingRoom({ ...editingRoom, type: e.target.value })
                  }
                />
                <input
                  type="number"
                  value={editingRoom.capacity}
                  onChange={(e) =>
                    setEditingRoom({ ...editingRoom, capacity: e.target.value })
                  }
                />
                <select
                  value={editingRoom.availability}
                  onChange={(e) =>
                    setEditingRoom({
                      ...editingRoom,
                      availability: e.target.value === "true",
                    })
                  }
                >
                  <option value="true">Available</option>
                  <option value="false">Unavailable</option>
                </select>
                <button onClick={() => handleEditRoom(room.r_id)}>Save</button>
                <button onClick={() => setEditingRoom(null)}>Cancel</button>
              </div>
            ) : (
              // View Mode
              <div>
                <strong>ID:</strong> {room.r_id} <br />
                <strong>Type:</strong> {room.type} <br />
                <strong>Capacity:</strong> {room.capacity} <br />
                <strong>Availability:</strong>{" "}
                {room.availability ? "Available" : "Unavailable"} <br />
                <button onClick={() => setEditingRoom(room)}>Edit</button>
                <button onClick={() => handleDeleteRoom(room.r_id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rooms;
