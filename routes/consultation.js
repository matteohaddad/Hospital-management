const express = require("express");
const router = express.Router();
const connection = require("../db");

// Get all consultations
router.get("/", (req, res) => {
  connection.query(
    `SELECT 
      c.c_id, c.rec_id, c.p_id, c.doc_id, c.r_id, c.consultation_datetime,
      p.name AS patient_name, p.age AS patient_age, p.gender AS patient_gender,
      d.doc_id AS doctor_id, e.name AS doctor_name,
      r.type AS room_type, r.capacity AS room_capacity
    FROM consultation c
    INNER JOIN patient p ON c.p_id = p.p_id
    INNER JOIN doctor d ON c.doc_id = d.doc_id
    INNER JOIN employee e ON d.emp_id = e.emp_id
    LEFT JOIN room r ON c.r_id = r.r_id`,
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});

// Get a specific consultation by c_id
router.get("/:id", (req, res) => {
  connection.query(
    `SELECT 
      c.c_id, c.rec_id, c.p_id, c.doc_id, c.r_id, c.consultation_datetime,
      p.name AS patient_name, p.age AS patient_age, p.gender AS patient_gender,
      d.doc_id AS doctor_id, e.name AS doctor_name,
      r.type AS room_type, r.capacity AS room_capacity
    FROM consultation c
    INNER JOIN patient p ON c.p_id = p.p_id
    INNER JOIN doctor d ON c.doc_id = d.doc_id
    INNER JOIN employee e ON d.emp_id = e.emp_id
    LEFT JOIN room r ON c.r_id = r.r_id
    WHERE c.c_id = ?`,
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.length === 0)
        return res.status(404).send("Consultation not found");
      res.json(result[0]);
    }
  );
});

// Create a new consultation
router.post("/", (req, res) => {
  const { rec_id, p_id, doc_id, r_id, consultation_datetime } = req.body;

  connection.query(
    `INSERT INTO consultation (rec_id, p_id, doc_id, r_id, consultation_datetime) 
    VALUES (?, ?, ?, ?, ?)`,
    [rec_id, p_id, doc_id, r_id, consultation_datetime],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({
        message: "Consultation created successfully",
        consultation_id: result.insertId,
      });
    }
  );
});

// Update a consultation
router.put("/:id", (req, res) => {
  const { rec_id, p_id, doc_id, r_id, consultation_datetime } = req.body;

  connection.query(
    `UPDATE consultation 
    SET rec_id = ?, p_id = ?, doc_id = ?, r_id = ?, consultation_datetime = ? 
    WHERE c_id = ?`,
    [rec_id, p_id, doc_id, r_id, consultation_datetime, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Consultation updated successfully" });
    }
  );
});

// Delete a consultation by c_id
router.delete("/:id", (req, res) => {
  connection.query(
    `DELETE FROM consultation WHERE c_id = ?`,
    [req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Consultation deleted successfully" });
    }
  );
});

module.exports = router;
