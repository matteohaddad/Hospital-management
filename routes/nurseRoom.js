const express = require("express");
const router = express.Router();
const connection = require("../db");

// Get all nurse-room assignments
router.get("/", (req, res) => {
  connection.query(
    `SELECT 
      nr.n_id, nr.r_id,
      e.name AS nurse_name, e.gender AS nurse_gender, e.mobile AS nurse_mobile,
      r.type AS room_type, r.capacity AS room_capacity, r.availability
    FROM nurse_room nr
    INNER JOIN nurse n ON nr.n_id = n.n_id
    INNER JOIN employee e ON n.emp_id = e.emp_id
    INNER JOIN room r ON nr.r_id = r.r_id`,
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});

// Get a specific nurse-room assignment by nurse ID and room ID
router.get("/:n_id/:r_id", (req, res) => {
  connection.query(
    `SELECT 
      nr.n_id, nr.r_id,
      e.name AS nurse_name, e.gender AS nurse_gender, e.mobile AS nurse_mobile,
      r.type AS room_type, r.capacity AS room_capacity, r.availability
    FROM nurse_room nr
    INNER JOIN nurse n ON nr.n_id = n.n_id
    INNER JOIN employee e ON n.emp_id = e.emp_id
    INNER JOIN room r ON nr.r_id = r.r_id
    WHERE nr.n_id = ? AND nr.r_id = ?`,
    [req.params.n_id, req.params.r_id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.length === 0)
        return res.status(404).send("Nurse-room assignment not found");
      res.json(result[0]);
    }
  );
});

// Assign a nurse to a room
router.post("/", (req, res) => {
  const { n_id, r_id } = req.body;

  // Ensure the nurse and room exist before assigning
  connection.query(
    `SELECT * FROM nurse WHERE n_id = ?`,
    [n_id],
    (err, nurseResults) => {
      if (err) return res.status(500).send(err);
      if (nurseResults.length === 0)
        return res.status(404).send("Nurse not found");

      connection.query(
        `SELECT * FROM room WHERE r_id = ?`,
        [r_id],
        (err, roomResults) => {
          if (err) return res.status(500).send(err);
          if (roomResults.length === 0)
            return res.status(404).send("Room not found");

          connection.query(
            `INSERT INTO nurse_room (n_id, r_id) VALUES (?, ?)`,
            [n_id, r_id],
            (err, result) => {
              if (err) return res.status(500).send(err);
              res.json({ message: "Nurse assigned to room successfully" });
            }
          );
        }
      );
    }
  );
});

// Update nurse-room assignment
router.put("/:n_id/:r_id", (req, res) => {
  const { new_r_id } = req.body;

  connection.query(
    `UPDATE nurse_room SET r_id = ? WHERE n_id = ? AND r_id = ?`,
    [new_r_id, req.params.n_id, req.params.r_id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Nurse-room assignment updated successfully" });
    }
  );
});

// Delete a nurse-room assignment
router.delete("/:n_id/:r_id", (req, res) => {
  connection.query(
    `DELETE FROM nurse_room WHERE n_id = ? AND r_id = ?`,
    [req.params.n_id, req.params.r_id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Nurse-room assignment deleted successfully" });
    }
  );
});

module.exports = router;
