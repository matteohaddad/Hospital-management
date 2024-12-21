import requests
import json

BASE_URL = "http://localhost:3000"  # Replace with your API base URL

# Helper function to print results
def print_response(response, description):
    print(f"Test: {description}")
    print(f"Status Code: {response.status_code}")
    try:
        print(f"Response: {json.dumps(response.json(), indent=4)}")
    except:
        print("Response content:", response.text)
    print("\n" + "=" * 50 + "\n")

# # Test Employees
# def test_employees():
#     print("Testing Employees API...\n" + "=" * 50)

    # # Insert an employee
    # response = requests.post(f"{BASE_URL}/employees", json={
    #     "name": "Cristina Marquigny",
    #     "salary": 2000000,
    #     "gender": "F",
    #     "mobile": 56734535675
    # })
    # print_response(response, "Insert Employee")
    # emp_id = response.json().get("id")

    # # Select all employees
    # response = requests.get(f"{BASE_URL}/employees")
    # print_response(response, "Select All Employees")

    # # Update the employee
    # response = requests.put(f"{BASE_URL}/employees/{emp_id}", json={
    #     "name": "John Smith",
    #     "salary": 55000,
    #     "gender": "M",
    #     "mobile": 9876543210
    # })
    # print_response(response, "Update Employee")
    # Delete the employee 
    # response = requests.delete(f"{BASE_URL}/employees/{emp_id}")
    # print_response(response, "Delete Employee")

# Test Patients
# def test_patients():
#     print("Testing Patients API...\n" + "=" * 50)

#     # Insert a patient
#     response = requests.post(f"{BASE_URL}/patients", json={
#         "name": "Cristina Marquigny",
#         "date_of_birth": "2003-03-11",
#         "gender": "F",
#         "mobile_number": 1238653,
#         "age": 21
#     })
#     print_response(response, "Insert Patient")
#     p_id = response.json().get("patient_id")

#     # Select all patients
#     response = requests.get(f"{BASE_URL}/patients")
#     print_response(response, "Select All Patients")
#     # Update the patient
#     response = requests.put(f"{BASE_URL}/patients/{p_id}", json={
#         "name": "Jane Smith",
#         "date_of_birth": "1995-06-15",
#         "gender": "F",
#         "mobile_number": 9876543210,
#         "age": 29
#     })
#     print_response(response, "Update Patient")

#     # Delete the patient
#     response = requests.delete(f"{BASE_URL}/patients/{p_id}")
#     print_response(response, "Delete Patient")

# # Test Receptions
# def test_receptions():
#     print("Testing Receptions API...\n" + "=" * 50)

#     # Step 1: Create an employee to use in the receptionist test
#     response = requests.post(f"{BASE_URL}/employees", json={
#         "name": "Receptionist Test",
#         "salary": 30000,
#         "gender": "F",
#         "mobile": 1234567890
#     })
#     print_response(response, "Insert Employee for Receptionist")
#     emp_id = response.json().get("id")

#     # Step 2: Insert a receptionist
#     response = requests.post(f"{BASE_URL}/receptions", json={"emp_id": emp_id})
#     print_response(response, "Insert Receptionist")
#     rec_id = response.json().get("id")

#     # Step 3: Select all receptionists
#     response = requests.get(f"{BASE_URL}/receptions")
#     print_response(response, "Select All Receptionists")
    # Step 4: Delete the receptionist
    # response = requests.delete(f"{BASE_URL}/receptions/{rec_id}")
    # print_response(response, "Delete Receptionist")
    # Step 5: Delete the employee
    # response = requests.delete(f"{BASE_URL}/employees/{emp_id}")
    # print_response(response, "Delete Employee Used for Receptionist")

# # Test Consultations
def test_consultations():
    print("Testing Consultations API...\n" + "=" * 50)

    # Insert a consultation
    response = requests.post(f"{BASE_URL}/consultations", json={
        "rec_id": 5,
        "p_id": 6,
        "doc_id": 3,
        "r_id": 3,
        "consultation_datetime": "2024-11-22T10:00:00"
    })
    print_response(response, "Insert Consultation")
    c_id = response.json().get("consultation_id")

#     # Select all consultations
#     response = requests.get(f"{BASE_URL}/consultations")
#     print_response(response, "Select All Consultations")

#     # Delete the consultation
#     response = requests.delete(f"{BASE_URL}/consultations/{c_id}")
#     print_response(response, "Delete Consultation")

# # Test Assigned Rooms
# def test_assigned_rooms():
#     print("Testing Assigned Rooms API...\n" + "=" * 50)

#     # Insert an assigned room
#     response = requests.post(f"{BASE_URL}/assigned-rooms", json={
#         "p_id": 6,
#         "r_id": 17,
#         "assigned_date": "2024-11-22T12:00:00"
#     })
#     print_response(response, "Insert Assigned Room")
#     assignment_id = response.json().get("assignment_id")

#     # Select all assigned rooms
#     response = requests.get(f"{BASE_URL}/assigned-rooms")
#     print_response(response, "Select All Assigned Rooms")

#     # Delete the assigned room
#     response = requests.delete(f"{BASE_URL}/assigned-rooms/{assignment_id}")
#     print_response(response, "Delete Assigned Room")

# def test_reports():
#     print("Testing Reports API...\n" + "=" * 50)

    # # Step 1: Create a patient
    # response = requests.post(f"{BASE_URL}/patients", json={
    #     "name": "John Patient",
    #     "date_of_birth": "1985-01-15",
    #     "gender": "M",
    #     "mobile_number": 1234567890,
    #     "age": 38
    # })
    # print_response(response, "Insert Patient for Report")
    # p_id = response.json().get("patient_id")

    # Step 2: Create an employee and doctor
    # response = requests.post(f"{BASE_URL}/employees", json={
    #     "name": "Dr.SAM JUNIOR",
    #     "salary": 90000,
    #     "gender": "M",
    #     "mobile": 9876543210
    # })
    # print_response(response, "Insert Employee for Doctor")
    # emp_id = response.json().get("id")

    # response = requests.post(f"{BASE_URL}/doctors", json={"emp_id": emp_id})
    # print_response(response, "Insert Doctor")
    # doc_id = response.json().get("doc_id")
    # Step 3: Insert a report
    # response = requests.post(f"{BASE_URL}/reports", json={
    #     "p_id": p_id,
    #     "doc_id": doc_id,
    #     "test_date": "2024-11-22T14:00:00",
    #     "test_description": "Routine Blood Test",
    #     "test_results": "All normal"
    # })
    # print_response(response, "Insert Report")
    # report_id = response.json().get("report_id")

    # # Step 4: Select all reports
    # response = requests.get(f"{BASE_URL}/reports")
    # print_response(response, "Select All Reports")

    # # Step 5: Delete the report
    # response = requests.delete(f"{BASE_URL}/reports/{report_id}")
    # print_response(response, "Delete Report")

    # # Step 6: Clean up - Delete the doctor, employee, and patient
    # response = requests.delete(f"{BASE_URL}/doctors/{doc_id}")
    # print_response(response, "Delete Doctor")
    # response = requests.delete(f"{BASE_URL}/employees/{emp_id}")
    # print_response(response, "Delete Employee Used for Doctor")
    # response = requests.delete(f"{BASE_URL}/patients/{p_id}")
    # print_response(response, "Delete Patient")

# Test Bills
# def test_bills():
#     print("Testing Bills API...\n" + "=" * 50)

#     # Insert a bill
#     response = requests.post(f"{BASE_URL}/bills", json={
#         "p_id": 6,
#         "rec_id": 5,
#         "bill_date": "2024-11-22T16:00:00",
#         "amount": 500.00
#     })
#     print_response(response, "Insert Bill")
#     bill_id = response.json().get("bill_id")

    # # Select all bills
    # response = requests.get(f"{BASE_URL}/bills")
    # print_response(response, "Select All Bills")

    # # Delete the bill
    # response = requests.delete(f"{BASE_URL}/bills/{bill_id}")
    # print_response(response, "Delete Bill")

# def test_rooms():
#     # Get all rooms
#     response = requests.get(f"{BASE_URL}/rooms")
#     print_response(response, "Get All Rooms")

#  # Create a new room
#     response = requests.post(f"{BASE_URL}/rooms", json={
#         "type": "VIP",
#         "capacity": 3,
#         "availability": True
#     })
#     print_response(response, "Create Room")
#     room_id = response.json().get("id")

# # Get a single room by ID
#     response = requests.get(f"{BASE_URL}/rooms/{room_id}")
#     print_response(response, "Get Room by ID") 

# # Update the room
#     response = requests.put(f"{BASE_URL}/rooms/{room_id}", json={
#         "type": "General Ward",
#         "capacity": 5,
#         "availability": False
#     })
#     print_response(response, "Update Room") 

# # Delete the room
#     response = requests.delete(f"{BASE_URL}/rooms/{room_id}")
#     print_response(response, "Delete Room")

# def test_nurses():
#     print("Testing Nurses API...\n" + "=" * 50)

#     # Step 1: Create an employee to associate with the nurse
#     response = requests.post(f"{BASE_URL}/employees", json={
#         "name": "Nurse Jane",
#         "salary": 30000,
#         "gender": "F",
#         "mobile": 1234567890
#     })
#     print_response(response, "Create Employee for Nurse")
#     emp_id = response.json().get("id")

#     if not emp_id:
#         print("Error: Failed to create employee for nurse.")
#         return

#     # Step 2: Create a nurse associated with the employee
#     response = requests.post(f"{BASE_URL}/nurses", json={"emp_id": emp_id})
#     print_response(response, "Create Nurse")
#     n_id = response.json().get("n_id")

#     if not n_id:
#         print("Error: Failed to create nurse.")
#         return

#     # Step 3: Get all nurses
#     response = requests.get(f"{BASE_URL}/nurses")
#     print_response(response, "Get All Nurses")

#     # Step 4: Get a specific nurse by ID
#     response = requests.get(f"{BASE_URL}/nurses/{n_id}")
#     print_response(response, "Get Nurse by ID")

#     # Step 5: Update the nurse
#     response = requests.put(f"{BASE_URL}/nurses/{n_id}", json={"emp_id": emp_id})
#     print_response(response, "Update Nurse")

#     # Step 6: Delete the nurse
#     response = requests.delete(f"{BASE_URL}/nurses/{n_id}")
#     print_response(response, "Delete Nurse")

#     # Step 7: Clean up - Delete the associated employee
#     response = requests.delete(f"{BASE_URL}/employees/{emp_id}")
#     print_response(response, "Delete Employee Associated with Nurse")

# def test_assigned_rooms():
#     print("Testing Assigned Rooms API...\n" + "=" * 50)

#     # Step 1: Create a patient
#     response = requests.post(f"{BASE_URL}/patients", json={
#         "name": "John Doe",
#         "date_of_birth": "1990-01-01",
#         "gender": "M",
#         "mobile_number": 1234567890,
#         "age": 33
#     })
#     print_response(response, "Create Patient for Assigned Room")
#     p_id = response.json().get("patient_id")

#     if not p_id:
#         print("Error: Failed to create patient.")
#         return

#     # Step 2: Create a room
#     response = requests.post(f"{BASE_URL}/rooms", json={
#         "type": "General Ward",
#         "capacity": 4,
#         "availability": True
#     })
#     print_response(response, "Create Room for Assignment")
#     r_id = response.json().get("id")

#     if not r_id:
#         print("Error: Failed to create room.")
#         return

#     # Step 3: Assign the room to the patient
#     response = requests.post(f"{BASE_URL}/assigned-rooms", json={
#         "p_id": p_id,
#         "r_id": r_id,
#         "assigned_date": "2024-11-23T12:00:00"
#     })
#     print_response(response, "Assign Room to Patient")
#     assignment_id = response.json().get("assignment_id")

#     if not assignment_id:
#         print("Error: Failed to assign room to patient.")
#         return

#     # Step 4: Get all assigned rooms
#     response = requests.get(f"{BASE_URL}/assigned-rooms")
#     print_response(response, "Get All Assigned Rooms")

#     # Step 5: Get the specific assigned room by ID
#     response = requests.get(f"{BASE_URL}/assigned-rooms/{assignment_id}")
#     print_response(response, "Get Assigned Room by ID")

#     # Step 6: Update the assigned room
#     response = requests.put(f"{BASE_URL}/assigned-rooms/{assignment_id}", json={
#         "p_id": p_id,
#         "r_id": r_id,
#         "assigned_date": "2024-11-24T14:00:00"
#     })
#     print_response(response, "Update Assigned Room")

#     # Step 7: Verify the updated assigned room
#     response = requests.get(f"{BASE_URL}/assigned-rooms/{assignment_id}")
#     print_response(response, "Verify Updated Assigned Room")

#     # Step 8: Delete the assigned room
#     response = requests.delete(f"{BASE_URL}/assigned-rooms/{assignment_id}")
#     print_response(response, "Delete Assigned Room")

#     # Step 9: Clean up - Delete the created patient and room
#     response = requests.delete(f"{BASE_URL}/patients/{p_id}")
#     print_response(response, "Delete Patient Used in Assignment")
#     response = requests.delete(f"{BASE_URL}/rooms/{r_id}")
#     print_response(response, "Delete Room Used in Assignment")

# def test_nurse_rooms():
#     print("Testing Nurse-Room API...\n" + "=" * 50)

#     # Step 1: Create an employee for the nurse
#     response = requests.post(f"{BASE_URL}/employees", json={
#         "name": "Nurse John",
#         "salary": 35000,
#         "gender": "M",
#         "mobile": 1234567890
#     })
#     print_response(response, "Create Employee for Nurse")
#     emp_id = response.json().get("id")

#     if not emp_id:
#         print("Error: Failed to create employee for nurse.")
#         return

#     # Step 2: Create a nurse
#     response = requests.post(f"{BASE_URL}/nurses", json={"emp_id": emp_id})
#     print_response(response, "Create Nurse")
#     n_id = response.json().get("n_id")

#     if not n_id:
#         print("Error: Failed to create nurse.")
#         return

#     # Step 3: Create a room
#     response = requests.post(f"{BASE_URL}/rooms", json={
#         "type": "General Ward",
#         "capacity": 5,
#         "availability": True
#     })
#     print_response(response, "Create Room for Nurse Assignment")
#     r_id = response.json().get("id")

#     if not r_id:
#         print("Error: Failed to create room.")
#         return

#     # Step 4: Assign the nurse to the room
#     response = requests.post(f"{BASE_URL}/nurse-rooms", json={
#         "n_id": n_id,
#         "r_id": r_id
#     })
#     print_response(response, "Assign Nurse to Room")

#     # Step 5: Get all nurse-room assignments
#     response = requests.get(f"{BASE_URL}/nurse-rooms")
#     print_response(response, "Get All Nurse-Room Assignments")

#     # Step 6: Get a specific nurse-room assignment
#     response = requests.get(f"{BASE_URL}/nurse-rooms/{n_id}/{r_id}")
#     print_response(response, "Get Specific Nurse-Room Assignment")

#     # Step 7: Update the nurse-room assignment
#     # Create another room to update the assignment
#     response = requests.post(f"{BASE_URL}/rooms", json={
#         "type": "ICU",
#         "capacity": 2,
#         "availability": True
#     })
#     print_response(response, "Create Another Room for Update")
#     new_r_id = response.json().get("id")

#     if not new_r_id:
#         print("Error: Failed to create new room for update.")
#         return

#     # Update the assignment
#     response = requests.put(f"{BASE_URL}/nurse-rooms/{n_id}/{r_id}", json={
#         "new_r_id": new_r_id
#     })
#     print_response(response, "Update Nurse-Room Assignment")

#     # Step 8: Delete the nurse-room assignment
#     response = requests.delete(f"{BASE_URL}/nurse-rooms/{n_id}/{new_r_id}")
#     print_response(response, "Delete Nurse-Room Assignment")

#     # Step 9: Clean up - Delete nurse, employee, and rooms
#     response = requests.delete(f"{BASE_URL}/nurses/{n_id}")
#     print_response(response, "Delete Nurse")
#     response = requests.delete(f"{BASE_URL}/employees/{emp_id}")
#     print_response(response, "Delete Employee Used for Nurse")
#     response = requests.delete(f"{BASE_URL}/rooms/{r_id}")
#     print_response(response, "Delete Original Room")
#     response = requests.delete(f"{BASE_URL}/rooms/{new_r_id}")
#     print_response(response, "Delete New Room")
  

# Run all tests
if __name__ == "__main__":
    print("Starting API Tests...\n" + "=" * 50)
    # test_employees()
    # test_patients()
    # test_receptions()
    # test_consultations()
    # test_assigned_rooms()
    # test_reports()
    # test_bills()
    # test_rooms()
    # test_nurses()
    # test_assigned_rooms()
    # test_nurse_rooms()
    print("API Tests Completed!\n" + "=" * 50)
