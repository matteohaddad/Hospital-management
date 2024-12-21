import React, { useState } from "react";
import axios from "axios";

const AddEmployee = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/employees", {
      name,
      salary,
      gender,
      mobile,
    })
      .then((response) => {
        onAdd(response.data);
        setName("");
        setSalary("");
        setGender("");
        setMobile("");
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        required
      />
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        required
      >
        <option value="">Select Gender</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
      </select>
      <input
        type="text"
        placeholder="Mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        required
      />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployee;
