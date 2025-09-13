import React from "react";
import "../css/add.css";

export default function Add() {
  const [book, setBook] = React.useState({
    tittle: "",
    desc: "",
    cover: "",
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };
  console.log("Book state:", book);

  // Function to handle form submission
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });

      if (!response.ok) {
        throw new Error("Failed to add book");
      }

      const data = await response.json();
      console.log("Book added successfully:", data);
      alert(data);
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Error adding book: " + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-header card-header-gradient text-white">
          <h4 className="mb-0">🌈 Add New BOOks Detail</h4>
        </div>
        <div className="card-body card-body-bg">
          <form>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Tittle
              </label>
              <input
                type="text"
                className="form-control border-info"
                placeholder="tittle of the book"
                onChange={handleChange}
                name="tittle"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="description"
                className="form-control border-info"
                placeholder="Type your description ..."
                onChange={handleChange}
                name="desc"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="cover" className="form-label">
                Cover
              </label>
              <input
                type="text"
                className="form-control border-info"
                placeholder="Paste your cover image URL here..."
                onChange={handleChange}
                name="cover"
              />
            </div>

            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn btn-lg submit-btn"
                onClick={handleClick}
              >
                🚀 ADD New Books
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
