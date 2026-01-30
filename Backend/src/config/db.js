import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "product_db"
});

db.connect((err) => {
  if (err) {
    console.error("MySQL error:", err);
    return;
  }
  console.log("MySQL Connected");
});

export default db;
