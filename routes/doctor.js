const express = require("express");
const router = express.Router();
const connection = require("../db");

// Get all doctors
router.get("/", (req, res) => {
  connection.query(
    `SELECT 
      d.doc_id, d.emp_id, 
      e.name AS doctor_name, e.salary, e.gender, e.mobile
    FROM doctor d
    INNER JOIN employee e ON d.emp_id = e.emp_id`,
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});

// Get a specific doctor by doc_id
router.get("/:id", (req, res) => {
  connection.query(
    `SELECT 
      d.doc_id, d.emp_id, 
      e.name AS doctor_name, e.salary, e.gender, e.mobile
    FROM doctor d
    INNER JOIN employee e ON d.emp_id = e.emp_id
    WHERE d.doc_id = ?`,
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.length === 0) return res.status(404).send("Doctor not found");
      res.json(result[0]);
    }
  );
});

// Create a new doctor
router.post("/", (req, res) => {
  const { emp_id } = req.body;

  // Check if the employee exists before creating a doctor record
  connection.query(
    `SELECT * FROM employee WHERE emp_id = ?`,
    [emp_id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0)
        return res.status(404).send("Employee not found");

      connection.query(
        `INSERT INTO doctor (emp_id) VALUES (?)`,
        [emp_id],
        (err, result) => {
          if (err) return res.status(500).send(err);
          res.json({
            message: "Doctor created successfully",
            doc_id: result.insertId,
          });
        }
      );
    }
  );
});

// Update a doctor
router.put("/:id", (req, res) => {
  const { emp_id } = req.body;

  connection.query(
    `UPDATE doctor SET emp_id = ? WHERE doc_id = ?`,
    [emp_id, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Doctor updated successfully" });
    }
  );
});

// Delete a doctor by doc_id
router.delete("/:id", (req, res) => {
  connection.query(
    `DELETE FROM doctor WHERE doc_id = ?`,
    [req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Doctor deleted successfully" });
    }
  );
});

module.exports = router;
