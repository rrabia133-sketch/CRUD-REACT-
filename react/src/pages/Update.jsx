import React, { use } from "react";
import "../css/add.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";

export default function Update() {
  const [book, setBook] = useState({
    tittle: "",
    desc: "",
    cover: "",
  });
  const { id } = useParams();
  const Naivigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/book/${bookId}`, book);
      alert("Book updated successfully!");
      Navigate("/");
    } catch (err) {
      console.log("bookId:", bookId);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-header card-header-gradient text-white">
          <h4 className="mb-0">🌈 updates BOOks Detail</h4>
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
                🚀 Update Books
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
