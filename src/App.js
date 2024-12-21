import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Employees from "./pages/Employees";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Patients from "./pages/Patients";
import Rooms from "./pages/Rooms.js";
import Doctors from "./pages/Doctors";
import Nurses from "./pages/Nurses.js";
import NurseRoom from "./pages/NurseRoom";
import Receptionists from "./pages/Receptionists.js";
import Reports from "./pages/Reports";
import Bills from "./pages/Bills";
import Consultations from "./pages/Consultations";
import AssignedRooms from "./pages/AssignedRooms";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<Employees />} />
        <Route path = "/patients" element={<Patients />}/>
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/nurses" element={<Nurses />} />
        <Route path="/nurse-rooms" element={<NurseRoom />} />
        <Route path="/receptions" element={<Receptionists />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/consultations" element={<Consultations />} />
        <Route path="/assigned-rooms" element={<AssignedRooms />} />
      </Routes>
    </Router>
  );
};


export default App;
