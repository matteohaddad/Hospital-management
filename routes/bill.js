const express = require("express");
const router = express.Router();
const connection = require("../db");

// Get all bills
router.get("/", (req, res) => {
  connection.query(
    `SELECT 
      b.bill_id, b.p_id, b.rec_id, b.bill_date, b.amount,
      p.name AS patient_name, p.age AS patient_age,
      r.rec_id AS reception_id, e.name AS receptionist_name
    FROM bill b
    INNER JOIN patient p ON b.p_id = p.p_id
    INNER JOIN Reception r ON b.rec_id = r.rec_id
    INNER JOIN employee e ON r.emp_id = e.emp_id`,
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});

// Get a specific bill by bill_id
router.get("/:id", (req, res) => {
  connection.query(
    `SELECT 
      b.bill_id, b.p_id, b.rec_id, b.bill_date, b.amount,
      p.name AS patient_name, p.age AS patient_age,
      r.rec_id AS reception_id, e.name AS receptionist_name
    FROM bill b
    INNER JOIN patient p ON b.p_id = p.p_id
    INNER JOIN Reception r ON b.rec_id = r.rec_id
    INNER JOIN employee e ON r.emp_id = e.emp_id
    WHERE b.bill_id = ?`,
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.length === 0) return res.status(404).send("Bill not found");
      res.json(result[0]);
    }
  );
});

// Create a new bill
router.post("/", (req, res) => {
  const { p_id, rec_id, bill_date, amount } = req.body;

  connection.query(
    `INSERT INTO bill (p_id, rec_id, bill_date, amount) VALUES (?, ?, ?, ?)`,
    [p_id, rec_id, bill_date, amount],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({
        message: "Bill created successfully",
        bill_id: result.insertId,
      });
    }
  );
});

// Update a bill
router.put("/:id", (req, res) => {
  const { p_id, rec_id, bill_date, amount } = req.body;

  connection.query(
    `UPDATE bill 
    SET p_id = ?, rec_id = ?, bill_date = ?, amount = ? 
    WHERE bill_id = ?`,
    [p_id, rec_id, bill_date, amount, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Bill updated successfully" });
    }
  );
});

// Delete a bill by bill_id
router.delete("/:id", (req, res) => {
  connection.query(
    `DELETE FROM bill WHERE bill_id = ?`,
    [req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Bill deleted successfully" });
    }
  );
});

module.exports = router;
