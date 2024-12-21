const express = require("express");
const router = express.Router();
const connection = require("../db");

// Get all patients
router.get("/", (req, res) => {
  connection.query("SELECT * FROM patient", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Get a specific patient by p_id
router.get("/:id", (req, res) => {
  connection.query(
    `SELECT * FROM patient WHERE p_id = ?`,
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.length === 0) return res.status(404).send("Patient not found");
      res.json(result[0]);
    }
  );
});

// Get patient details with assigned rooms
router.get("/:id/assigned-rooms", (req, res) => {
  connection.query(
    `SELECT 
      p.p_id, p.name AS patient_name, p.date_of_birth, p.age, p.gender, p.mobile_number,
      ar.r_id, ar.assigned_date,
      r.type AS room_type, r.capacity AS room_capacity, r.availability
    FROM patient p
    LEFT JOIN assigned_room ar ON p.p_id = ar.p_id
    LEFT JOIN room r ON ar.r_id = r.r_id
    WHERE p.p_id = ?`,
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0)
        return res.status(404).send("No assigned rooms found for this patient");
      res.json(results);
    }
  );
});

// Add a new patient
router.post("/", (req, res) => {
  const { name, date_of_birth, gender, mobile_number, age } = req.body;

  connection.query(
    `INSERT INTO patient (name, date_of_birth, gender, mobile_number, age) VALUES (?, ?, ?, ?, ?)`,
    [name, date_of_birth, gender, mobile_number, age],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({
        message: "Patient added successfully",
        patient_id: result.insertId,
      });
    }
  );
});

// Update patient information
router.put("/:id", (req, res) => {
  const { name, date_of_birth, gender, mobile_number, age } = req.body;

  connection.query(
    `UPDATE patient 
    SET name = ?, date_of_birth = ?, gender = ?, mobile_number = ?, age = ? 
    WHERE p_id = ?`,
    [name, date_of_birth, gender, mobile_number, age, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Patient updated successfully" });
    }
  );
});

// Delete a patient by p_id
router.delete("/:id", (req, res) => {
  connection.query(
    `DELETE FROM patient WHERE p_id = ?`,
    [req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Patient deleted successfully" });
    }
  );
});

module.exports = router;
