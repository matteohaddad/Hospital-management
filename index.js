const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

const cors = require("cors");
app.use(cors());

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Importing Routes
const employeeRoutes = require("./routes/employee");
const receptionRoutes = require("./routes/reception");
const doctorRoutes = require("./routes/doctor");
const patientRoutes = require("./routes/patient");
const roomRoutes = require("./routes/room");
const consultationRoutes = require("./routes/consultation");
const nurseRoutes = require("./routes/nurse");
const nurseRoomRoutes = require("./routes/nurseRoom");
const assignedRoomRoutes = require("./routes/assignedRoom");
const reportRoutes = require("./routes/report");
const billRoutes = require("./routes/bill");

// Setting up Routes
app.use("/employees", employeeRoutes);
app.use("/receptions", receptionRoutes);
app.use("/doctors", doctorRoutes);
app.use("/patients", patientRoutes);
app.use("/rooms", roomRoutes);
app.use("/consultations", consultationRoutes);
app.use("/nurses", nurseRoutes);
app.use("/nurse-rooms", nurseRoomRoutes);
app.use("/assigned-rooms", assignedRoomRoutes);
app.use("/reports", reportRoutes);
app.use("/bills", billRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Hospital Management System API!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
