import React, { useState, useEffect } from "react";
import axios from "axios";

const Bills = () => {
  const [bills, setBills] = useState([]); // All bills
  const [search, setSearch] = useState(""); // Search input state
  const [filteredBills, setFilteredBills] = useState([]); // Filtered results
  const [newBill, setNewBill] = useState({
    p_id: "",
    rec_id: "",
    bill_date: "",
    amount: "",
  }); // New bill data
  const [editingBill, setEditingBill] = useState(null); // Bill being edited

  // Fetch bills when the component loads
  const fetchBills = async () => {
    try {
      const response = await axios.get("http://localhost:3000/bills");
      console.log("Fetched Bills:", response.data); // Debugging: Log data
      setBills(response.data);
      setFilteredBills(response.data); // Initially show all bills
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    filterBills(e.target.value);
  };

  // Filter bills based on search text
  const filterBills = (searchValue) => {
    const filtered = bills.filter((bill) => {
      return (
        bill.patient_name
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        bill.receptionist_name
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        bill.bill_id.toString().includes(searchValue)
      );
    });
    setFilteredBills(filtered);
  };

  // Add a new bill
  const handleAddBill = async () => {
    try {
      await axios.post("http://localhost:3000/bills", newBill);
      setNewBill({ p_id: "", rec_id: "", bill_date: "", amount: "" }); // Clear form
      fetchBills(); // Refresh the list
    } catch (error) {
      console.error("Error adding bill:", error);
    }
  };

  // Edit a bill
  const handleEditBill = async (bill_id) => {
    try {
      await axios.put(`http://localhost:3000/bills/${bill_id}`, editingBill);
      setEditingBill(null); // Exit edit mode
      fetchBills(); // Refresh the list
    } catch (error) {
      console.error("Error updating bill:", error);
    }
  };

  // Delete a bill
  const handleDeleteBill = async (bill_id) => {
    try {
      await axios.delete(`http://localhost:3000/bills/${bill_id}`);
      fetchBills(); // Refresh the list
    } catch (error) {
      console.error("Error deleting bill:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Bills</h1>

      {/* Search Input */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by Patient Name, Receptionist Name, or Bill ID"
          value={search}
          onChange={handleSearchChange}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Add Bill Form */}
      <div>
        <h3>Add New Bill</h3>
        <input
          type="number"
          placeholder="Patient ID"
          value={newBill.p_id}
          onChange={(e) => setNewBill({ ...newBill, p_id: e.target.value })}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <input
          type="number"
          placeholder="Reception ID"
          value={newBill.rec_id}
          onChange={(e) => setNewBill({ ...newBill, rec_id: e.target.value })}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <input
          type="datetime-local"
          value={newBill.bill_date}
          onChange={(e) =>
            setNewBill({ ...newBill, bill_date: e.target.value })
          }
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <input
          type="number"
          placeholder="Amount"
          value={newBill.amount}
          onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button onClick={handleAddBill}>Add Bill</button>
      </div>

      {/* Bills List */}
      <ul>
        {filteredBills.map((bill) => (
          <li
            key={bill.bill_id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              listStyle: "none",
            }}
          >
            {editingBill && editingBill.bill_id === bill.bill_id ? (
              // Edit Mode
              <div>
                <input
                  type="number"
                  value={editingBill.amount}
                  onChange={(e) =>
                    setEditingBill({ ...editingBill, amount: e.target.value })
                  }
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
                <button onClick={() => handleEditBill(bill.bill_id)}>
                  Save
                </button>
                <button onClick={() => setEditingBill(null)}>Cancel</button>
              </div>
            ) : (
              // View Mode
              <div>
                <strong>Bill ID:</strong> {bill.bill_id} <br />
                <strong>Patient:</strong> {bill.patient_name || "N/A"} <br />
                <strong>Receptionist:</strong> {bill.receptionist_name || "N/A"}{" "}
                <br />
                <strong>Bill Date:</strong> {bill.bill_date || "N/A"} <br />
                <strong>Amount:</strong> ${bill.amount || "N/A"} <br />
                <button onClick={() => setEditingBill(bill)}>Edit</button>
                <button onClick={() => handleDeleteBill(bill.bill_id)}>
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bills;
