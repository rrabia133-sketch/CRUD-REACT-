import express from "express";
import mysql from "mysql2";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rabia123",
  database: "cruddb",
});

// Test database connection
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.get("/", (req, res) => {
  res.json("Welcome to the CRUD application running!");
});

/// database book
app.get("/book", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Add a new book

app.post("/book", (req, res) => {
  const q = "INSERT INTO books(`tittle`, `desc`, `cover`) VALUES (?)";
  const values = [req.body.tittle, req.body.desc, req.body.cover];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created successfully!");
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// dedete a book by ID

app.delete("/book/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted successfully!");
  });
});

// Update a book by ID

app.put("/book/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `tittle` = ?, `desc` = ?, `cover` = ? WHERE id = ?";
  const values = [req.body.tittle, req.body.desc, req.body.cover, bookId];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated successfully!");
  });
});

// Start the server

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
