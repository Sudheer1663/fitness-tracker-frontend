import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Alllinks from "./routes/Alllinks";
import { AuthProvider } from "./contexts/Authcontext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Alllinks />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

