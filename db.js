const mysql = require("mysql2");

const dbConfig = {
  port: 3306,
  host: "127.0.0.1",
  user: "root",
  password: "Haddad@12",
  database: "hospital_management",
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
  console.log("Connected to the MySQL database!");
});

module.exports = connection;
