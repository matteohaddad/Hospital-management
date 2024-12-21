const express = require("express");
const router = express.Router();
const connection = require("../db");

// Get all employees
router.get("/", (req, res) => {
  connection.query("SELECT * FROM employee", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Get a single employee by ID
router.get("/:id", (req, res) => {
  connection.query(
    "SELECT * FROM employee WHERE emp_id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0)
        return res.status(404).send("Employee not found");
      res.json(results[0]);
    }
  );
});

// Get employees with an INNER JOIN example (e.g., joining with Reception table)
router.get("/with-receptions", (req, res) => {
  const query = `
    SELECT employee.emp_id, employee.name, employee.salary, employee.gender, employee.mobile, Reception.rec_id
    FROM employee
    INNER JOIN Reception ON employee.emp_id = Reception.emp_id
  `;
  connection.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Create a new employee
router.post("/", (req, res) => {
  const { name, salary, gender, mobile } = req.body;
  if (!name || !salary || !gender || !mobile) {
    return res.status(400).send("All fields are required");
  }
  const query =
    "INSERT INTO employee (name, salary, gender, mobile) VALUES (?, ?, ?, ?)";
  connection.query(query, [name, salary, gender, mobile], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, message: "Employee created successfully" });
  });
});

// Update an employee by ID
router.put("/:id", (req, res) => {
  const { name, salary, gender, mobile } = req.body;
  if (!name || !salary || !gender || !mobile) {
    return res.status(400).send("All fields are required");
  }
  const query = `
    UPDATE employee 
    SET name = ?, salary = ?, gender = ?, mobile = ?
    WHERE emp_id = ?
  `;
  connection.query(
    query,
    [name, salary, gender, mobile, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Employee updated successfully" });
    }
  );
});

// Delete an employee by ID
router.delete("/:id", (req, res) => {
  const query = "DELETE FROM employee WHERE emp_id = ?";
  connection.query(query, [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Employee deleted successfully" });
  });
});

module.exports = router;
