import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  port: "3307",
  user: "root",
  password: "root",
  database: "social_lama",
});
db.on("connection", (data) => {
  console.log("connected to", data);
});
