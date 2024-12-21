const express = require("express");
const router = express.Router();
const connection = require("../db");

// Get all receptionists
router.get("/", (req, res) => {
  connection.query(
    `SELECT 
      r.rec_id, r.emp_id,
      e.name AS receptionist_name, e.salary, e.gender, e.mobile
    FROM Reception r
    INNER JOIN employee e ON r.emp_id = e.emp_id`,
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});

// Get a specific receptionist by rec_id
router.get("/:id", (req, res) => {
  connection.query(
    `SELECT 
      r.rec_id, r.emp_id,
      e.name AS receptionist_name, e.salary, e.gender, e.mobile
    FROM Reception r
    INNER JOIN employee e ON r.emp_id = e.emp_id
    WHERE r.rec_id = ?`,
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.length === 0)
        return res.status(404).send("Receptionist not found");
      res.json(result[0]);
    }
  );
});

// Add a new receptionist
router.post("/", (req, res) => {
  const { emp_id } = req.body;

  // Check if the employee exists before assigning them as a receptionist
  connection.query(
    `SELECT * FROM employee WHERE emp_id = ?`,
    [emp_id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0)
        return res.status(404).send("Employee not found");

      connection.query(
        `INSERT INTO Reception (emp_id) VALUES (?)`,
        [emp_id],
        (err, result) => {
          if (err) return res.status(500).send(err);
          res.json({
            message: "Receptionist added successfully",
            rec_id: result.insertId,
          });
        }
      );
    }
  );
});

// Update a receptionist
router.put("/:id", (req, res) => {
  const { emp_id } = req.body;

  connection.query(
    `UPDATE Reception SET emp_id = ? WHERE rec_id = ?`,
    [emp_id, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Receptionist updated successfully" });
    }
  );
});

// Delete a receptionist by rec_id
router.delete("/:id", (req, res) => {
  connection.query(
    `DELETE FROM Reception WHERE rec_id = ?`,
    [req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Receptionist deleted successfully" });
    }
  );
});

module.exports = router;
