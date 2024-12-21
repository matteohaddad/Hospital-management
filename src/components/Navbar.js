import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/employees">Employees</Link></li>
        <li><Link to="/patients">Patients</Link></li>
        <li><Link to="/rooms">Rooms</Link></li>
        <li><Link to="/doctors">Doctors</Link></li>
        <li><Link to="/nurses">Nurses</Link></li>
        <li><Link to="/nurse-rooms">Nurse Rooms</Link></li>
        <li><Link to="/receptions">Receptionists</Link></li>
        <li><Link to="/reports">Reports</Link></li>
        <li><Link to="/bills">Bills</Link></li>
        <li><Link to="/consultations">Consultations</Link></li>
        <li><Link to="/assigned-rooms">Assigned Rooms</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
