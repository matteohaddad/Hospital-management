const express = require("express");
const router = express.Router();
const connection = require("../db");

// Get all assigned rooms
router.get("/", (req, res) => {
  connection.query(
    `SELECT 
      ar.assignment_id, ar.p_id, ar.r_id, ar.assigned_date, 
      p.name AS patient_name, p.age AS patient_age, 
      r.type AS room_type, r.capacity AS room_capacity, r.availability 
    FROM assigned_room ar
    INNER JOIN patient p ON ar.p_id = p.p_id
    INNER JOIN room r ON ar.r_id = r.r_id`,
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});

// Get a specific assigned room by assignment_id
router.get("/:id", (req, res) => {
  connection.query(
    `SELECT 
      ar.assignment_id, ar.p_id, ar.r_id, ar.assigned_date, 
      p.name AS patient_name, p.age AS patient_age, 
      r.type AS room_type, r.capacity AS room_capacity, r.availability 
    FROM assigned_room ar
    INNER JOIN patient p ON ar.p_id = p.p_id
    INNER JOIN room r ON ar.r_id = r.r_id
    WHERE ar.assignment_id = ?`,
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.length === 0)
        return res.status(404).send("Assigned room not found");
      res.json(result[0]);
    }
  );
});

// Assign a patient to a room
router.post("/", (req, res) => {
  const { p_id, r_id, assigned_date } = req.body;

  connection.query(
    `INSERT INTO assigned_room (p_id, r_id, assigned_date) VALUES (?, ?, ?)`,
    [p_id, r_id, assigned_date],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({
        message: "Room assigned successfully",
        assignment_id: result.insertId,
      });
    }
  );
});

// Update an assigned room
router.put("/:id", (req, res) => {
  const { p_id, r_id, assigned_date } = req.body;

  connection.query(
    `UPDATE assigned_room 
    SET p_id = ?, r_id = ?, assigned_date = ? 
    WHERE assignment_id = ?`,
    [p_id, r_id, assigned_date, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Assigned room updated successfully" });
    }
  );
});

// Delete an assigned room by assignment_id
router.delete("/:id", (req, res) => {
  connection.query(
    `DELETE FROM assigned_room WHERE assignment_id = ?`,
    [req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Assigned room deleted successfully" });
    }
  );
});

module.exports = router;
