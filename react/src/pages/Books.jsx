import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../css/books.css";
import { Link } from "react-router-dom";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("http://localhost:3000/book");
        console.log("API Response:", response.data);

        setBooks(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Failed to fetch books:", error);
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!Array.isArray(books)) return <div>No books available</div>;

  // delete button handler

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:3000/book/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="books-container">
      <h1 className="books-title">Books Collection</h1>
      {books.length === 0 ? (
        <p className="no-books">No books found in the library</p>
      ) : (
        <ul className="books-grid">
          {books.map((book) => (
            <li key={book.id || Math.random()} className="book-card">
              {book.cover && (
                <img
                  className="book-image"
                  src={book.cover}
                  alt={book.tittle}
                />
              )}
              <div className="book-content">
                <h2 className="book-title">{book.tittle}</h2>
                <p className="book-description">{book.desc}</p>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-success btn-sm btn-small"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete Books
                </button>

                <Link
                  className="btn btn-success btn-sm btn-small"
                  to={`/Update/${book.id}`}
                >
                  Edit Books
                </Link>

                <Link className="btn btn-success btn-sm btn-small" to={`/add`}>
                  Add Books
                </Link>

                <br />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
