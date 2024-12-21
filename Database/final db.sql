-- Create the database
CREATE DATABASE IF NOT EXISTS Hospital_management;
USE Hospital_management;

-- Create employee table
CREATE TABLE IF NOT EXISTS employee (
    emp_id INT(6) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    salary FLOAT(10,2) NOT NULL,
    gender CHAR(1) CHECK (gender IN ('M', 'F')),
    mobile BIGINT NOT NULL
) ENGINE=InnoDB; --storage engine for the table advance features to ensure data integrity reliability and performance

-- Create Reception table
CREATE TABLE IF NOT EXISTS Reception (
    rec_id INT(6) AUTO_INCREMENT PRIMARY KEY,
    emp_id INT(6),
    FOREIGN KEY (emp_id) REFERENCES employee(emp_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Create doctor table
CREATE TABLE IF NOT EXISTS doctor (
    doc_id INT(6) AUTO_INCREMENT PRIMARY KEY,
    emp_id INT(6),
    FOREIGN KEY (emp_id) REFERENCES employee(emp_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Create patient table
CREATE TABLE IF NOT EXISTS patient (
    p_id INT(6) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender CHAR(1) CHECK (gender IN ('M', 'F')),
    mobile_number BIGINT NOT NULL,
    age INT(4)
) ENGINE=InnoDB;

-- Create room table
CREATE TABLE IF NOT EXISTS room (
    r_id INT(6) AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(30) NOT NULL,
    capacity INT(6) NOT NULL,
    availability BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB;

-- Create consultation table
CREATE TABLE IF NOT EXISTS consultation (
    c_id INT(6) AUTO_INCREMENT PRIMARY KEY, -- Unique consultation ID
    rec_id INT(6), -- Reference to Reception table
    p_id INT(6), -- Reference to Patient table
    doc_id INT(6), -- Reference to Doctor table
    r_id INT(6), -- Reference to Room table
    consultation_datetime DATETIME NOT NULL, -- Stores both date and time
    FOREIGN KEY (rec_id) REFERENCES Reception(rec_id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (p_id) REFERENCES patient(p_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (doc_id) REFERENCES doctor(doc_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (r_id) REFERENCES room(r_id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Create nurse table
CREATE TABLE IF NOT EXISTS nurse (
    n_id INT(6) AUTO_INCREMENT PRIMARY KEY,
    emp_id INT(6),
    FOREIGN KEY (emp_id) REFERENCES employee(emp_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Create nurse_room table
CREATE TABLE IF NOT EXISTS nurse_room (
    n_id INT(6),
    r_id INT(6),
    PRIMARY KEY (n_id, r_id),
    FOREIGN KEY (n_id) REFERENCES nurse(n_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (r_id) REFERENCES room(r_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Create room assignment table
CREATE TABLE IF NOT EXISTS assigned_room (
    assignment_id INT(6) AUTO_INCREMENT PRIMARY KEY,
    p_id INT(6), -- Reference to Patient table
    r_id INT(6), -- Reference to Room table
    assigned_date DATETIME NOT NULL,
    FOREIGN KEY (p_id) REFERENCES patient(p_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (r_id) REFERENCES room(r_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Create report table
CREATE TABLE IF NOT EXISTS report (
    report_id INT(6) AUTO_INCREMENT PRIMARY KEY,
    p_id INT(6), -- Reference to Patient table
    doc_id INT(6), -- Reference to Doctor table
    test_date DATETIME NOT NULL,
    test_description TEXT NOT NULL,
    test_results TEXT,
    FOREIGN KEY (p_id) REFERENCES patient(p_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (doc_id) REFERENCES doctor(doc_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Create bill table
CREATE TABLE IF NOT EXISTS bill (
    bill_id INT(6) AUTO_INCREMENT PRIMARY KEY,
    p_id INT(6), -- Reference to Patient table
    rec_id INT(6), -- Reference to Reception table
    bill_date DATETIME NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (p_id) REFERENCES patient(p_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (rec_id) REFERENCES Reception(rec_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;
