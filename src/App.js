import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Alllinks from "./routes/Alllinks";

function App() {
  return (
    <BrowserRouter>
      <Alllinks />
    </BrowserRouter>
  );
}

export default App;

