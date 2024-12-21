const express = require("express");
const router = express.Router();
const connection = require("../db");

// Get all rooms
router.get("/", (req, res) => {
  connection.query("SELECT * FROM room", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Get a single room by ID
router.get("/:id", (req, res) => {
  connection.query(
    "SELECT * FROM room WHERE r_id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0) return res.status(404).send("Room not found");
      res.json(results[0]);
    }
  );
});

// Create a new room
router.post("/", (req, res) => {
  const { type, capacity, availability } = req.body;

  // Validate required fields
  if (!type || !capacity || availability === undefined) {
    return res.status(400).send("Room type, capacity, and availability are required");
  }

  const query = "INSERT INTO room (type, capacity, availability) VALUES (?, ?, ?)";
  connection.query(
    query,
    [type, capacity, availability ? 1 : 0], // Convert availability to 1/0
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, message: "Room created successfully" });
    }
  );
});

// Update a room by ID
router.put("/:id", (req, res) => {
  const { type, capacity, availability } = req.body;

  // Validate required fields
  if (!type || !capacity || availability === undefined) {
    return res.status(400).send("Room type, capacity, and availability are required");
  }

  const query = `
    UPDATE room 
    SET type = ?, capacity = ?, availability = ? 
    WHERE r_id = ?
  `;
  connection.query(
    query,
    [type, capacity, availability ? 1 : 0, req.params.id], // Convert availability to 1/0
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Room updated successfully" });
    }
  );
});

// Delete a room by ID
router.delete("/:id", (req, res) => {
  const query = "DELETE FROM room WHERE r_id = ?";
  connection.query(query, [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Room deleted successfully" });
  });
});

module.exports = router;
