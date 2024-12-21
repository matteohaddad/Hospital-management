import React, { useState, useEffect } from "react";
import axios from "axios";

const Reports = () => {
  const [reports, setReports] = useState([]); // All reports
  const [search, setSearch] = useState(""); // Search input state
  const [filteredReports, setFilteredReports] = useState([]); // Filtered results
  const [newReport, setNewReport] = useState({
    p_id: "",
    doc_id: "",
    test_date: "",
    test_description: "",
    test_results: "",
  }); // New report data
  const [editingReport, setEditingReport] = useState(null); // Report being edited

  // Fetch reports when the component loads
  const fetchReports = async () => {
    try {
      const response = await axios.get("http://localhost:3000/reports");
      console.log("Fetched Reports:", response.data); // Debugging: Log data
      setReports(response.data);
      setFilteredReports(response.data); // Initially show all reports
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    filterReports(e.target.value);
  };

  // Filter reports based on search text
  const filterReports = (searchValue) => {
    const filtered = reports.filter((report) => {
      return (
        report.patient_name
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        report.doctor_name
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        report.test_description
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        report.report_id.toString().includes(searchValue)
      );
    });
    setFilteredReports(filtered);
  };

  // Add a new report
  const handleAddReport = async () => {
    try {
      await axios.post("http://localhost:3000/reports", newReport);
      setNewReport({
        p_id: "",
        doc_id: "",
        test_date: "",
        test_description: "",
        test_results: "",
      }); // Clear form
      fetchReports(); // Refresh the list
    } catch (error) {
      console.error("Error adding report:", error);
    }
  };

  // Edit a report
  const handleEditReport = async (report_id) => {
    try {
      await axios.put(
        `http://localhost:3000/reports/${report_id}`,
        editingReport
      );
      setEditingReport(null); // Exit edit mode
      fetchReports(); // Refresh the list
    } catch (error) {
      console.error("Error updating report:", error);
    }
  };

  // Delete a report
  const handleDeleteReport = async (report_id) => {
    try {
      await axios.delete(`http://localhost:3000/reports/${report_id}`);
      fetchReports(); // Refresh the list
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Reports</h1>

      {/* Search Input */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by Name, Test Description, or ID"
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

      {/* Add Report Form */}
      <div>
        <h3>Add New Report</h3>
        <input
          type="number"
          placeholder="Patient ID"
          value={newReport.p_id}
          onChange={(e) => setNewReport({ ...newReport, p_id: e.target.value })}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <input
          type="number"
          placeholder="Doctor ID"
          value={newReport.doc_id}
          onChange={(e) =>
            setNewReport({ ...newReport, doc_id: e.target.value })
          }
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <input
          type="datetime-local"
          value={newReport.test_date}
          onChange={(e) =>
            setNewReport({ ...newReport, test_date: e.target.value })
          }
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <input
          type="text"
          placeholder="Test Description"
          value={newReport.test_description}
          onChange={(e) =>
            setNewReport({ ...newReport, test_description: e.target.value })
          }
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <input
          type="text"
          placeholder="Test Results"
          value={newReport.test_results}
          onChange={(e) =>
            setNewReport({ ...newReport, test_results: e.target.value })
          }
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button onClick={handleAddReport}>Add Report</button>
      </div>

      {/* Reports List */}
      <ul>
        {filteredReports.map((report) => (
          <li
            key={report.report_id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              listStyle: "none",
            }}
          >
            {editingReport && editingReport.report_id === report.report_id ? (
              // Edit Mode
              <div>
                <input
                  type="text"
                  placeholder="Test Description"
                  value={editingReport.test_description}
                  onChange={(e) =>
                    setEditingReport({
                      ...editingReport,
                      test_description: e.target.value,
                    })
                  }
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
                <button onClick={() => handleEditReport(report.report_id)}>
                  Save
                </button>
                <button onClick={() => setEditingReport(null)}>Cancel</button>
              </div>
            ) : (
              // View Mode
              <div>
                <strong>Report ID:</strong> {report.report_id} <br />
                <strong>Patient:</strong> {report.patient_name || "N/A"} <br />
                <strong>Doctor:</strong> {report.doctor_name || "N/A"} <br />
                <strong>Test Date:</strong> {report.test_date || "N/A"} <br />
                <strong>Test Description:</strong>{" "}
                {report.test_description || "N/A"} <br />
                <strong>Test Results:</strong> {report.test_results || "N/A"}{" "}
                <br />
                <button onClick={() => setEditingReport(report)}>Edit</button>
                <button
                  onClick={() => handleDeleteReport(report.report_id)}
                >
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

export default Reports;
