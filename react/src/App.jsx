import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Books from "./pages/books";
import Add from "./pages/add";
import Update from "./pages/update";
function App() {
  return (
    // this is main page
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
