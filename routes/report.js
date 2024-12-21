const express = require("express");
const router = express.Router();
const connection = require("../db");

// Get all reports
router.get("/", (req, res) => {
  connection.query(
    `SELECT 
      r.report_id, r.p_id, r.doc_id, r.test_date, r.test_description, r.test_results,
      p.name AS patient_name, p.age AS patient_age, p.gender AS patient_gender,
      e.name AS doctor_name
    FROM report r
    INNER JOIN patient p ON r.p_id = p.p_id
    INNER JOIN doctor d ON r.doc_id = d.doc_id
    INNER JOIN employee e ON d.emp_id = e.emp_id`,
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});

// Get a specific report by report_id
router.get("/:id", (req, res) => {
  connection.query(
    `SELECT 
      r.report_id, r.p_id, r.doc_id, r.test_date, r.test_description, r.test_results,
      p.name AS patient_name, p.age AS patient_age, p.gender AS patient_gender,
      e.name AS doctor_name
    FROM report r
    INNER JOIN patient p ON r.p_id = p.p_id
    INNER JOIN doctor d ON r.doc_id = d.doc_id
    INNER JOIN employee e ON d.emp_id = e.emp_id
    WHERE r.report_id = ?`,
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.length === 0) return res.status(404).send("Report not found");
      res.json(result[0]);
    }
  );
});

// Add a new report
router.post("/", (req, res) => {
  const { p_id, doc_id, test_date, test_description, test_results } = req.body;

  // Ensure the patient and doctor exist before creating the report
  connection.query(
    `SELECT * FROM patient WHERE p_id = ?`,
    [p_id],
    (err, patientResults) => {
      if (err) return res.status(500).send(err);
      if (patientResults.length === 0)
        return res.status(404).send("Patient not found");

      connection.query(
        `SELECT * FROM doctor WHERE doc_id = ?`,
        [doc_id],
        (err, doctorResults) => {
          if (err) return res.status(500).send(err);
          if (doctorResults.length === 0)
            return res.status(404).send("Doctor not found");

          connection.query(
            `INSERT INTO report (p_id, doc_id, test_date, test_description, test_results) 
            VALUES (?, ?, ?, ?, ?)`,
            [p_id, doc_id, test_date, test_description, test_results],
            (err, result) => {
              if (err) return res.status(500).send(err);
              res.json({
                message: "Report created successfully",
                report_id: result.insertId,
              });
            }
          );
        }
      );
    }
  );
});

// Update a report
router.put("/:id", (req, res) => {
  const { p_id, doc_id, test_date, test_description, test_results } = req.body;

  connection.query(
    `UPDATE report 
    SET p_id = ?, doc_id = ?, test_date = ?, test_description = ?, test_results = ? 
    WHERE report_id = ?`,
    [p_id, doc_id, test_date, test_description, test_results, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Report updated successfully" });
    }
  );
});

// Delete a report by report_id
router.delete("/:id", (req, res) => {
  connection.query(
    `DELETE FROM report WHERE report_id = ?`,
    [req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Report deleted successfully" });
    }
  );
});

module.exports = router;
