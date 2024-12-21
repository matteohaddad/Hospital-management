const express = require("express");
const router = express.Router();
const connection = require("../db");

// Get all nurses
router.get("/", (req, res) => {
  connection.query(
    `SELECT 
      n.n_id, n.emp_id, 
      e.name AS nurse_name, e.salary, e.gender, e.mobile
    FROM nurse n
    INNER JOIN employee e ON n.emp_id = e.emp_id`,
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});

// Get a specific nurse by n_id
router.get("/:id", (req, res) => {
  connection.query(
    `SELECT 
      n.n_id, n.emp_id, 
      e.name AS nurse_name, e.salary, e.gender, e.mobile
    FROM nurse n
    INNER JOIN employee e ON n.emp_id = e.emp_id
    WHERE n.n_id = ?`,
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.length === 0) return res.status(404).send("Nurse not found");
      res.json(result[0]);
    }
  );
});

// Create a new nurse
router.post("/", (req, res) => {
  const { emp_id } = req.body;

  // Check if the employee exists before creating a nurse record
  connection.query(
    `SELECT * FROM employee WHERE emp_id = ?`,
    [emp_id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0)
        return res.status(404).send("Employee not found");

      connection.query(
        `INSERT INTO nurse (emp_id) VALUES (?)`,
        [emp_id],
        (err, result) => {
          if (err) return res.status(500).send(err);
          res.json({
            message: "Nurse created successfully",
            n_id: result.insertId,
          });
        }
      );
    }
  );
});

// Update a nurse
router.put("/:id", (req, res) => {
  const { emp_id } = req.body;

  connection.query(
    `UPDATE nurse SET emp_id = ? WHERE n_id = ?`,
    [emp_id, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Nurse updated successfully" });
    }
  );
});

// Delete a nurse by n_id
router.delete("/:id", (req, res) => {
  connection.query(
    `DELETE FROM nurse WHERE n_id = ?`,
    [req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Nurse deleted successfully" });
    }
  );
});

module.exports = router;
