import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Alllinks from "./routes/Alllinks";
import { AuthProvider } from "./contexts/Authcontext";
import { CartProvider } from "./contexts/CartContext";

const userId = 1; // Replace with actual logged-in user ID

function App() {
  return (
    <AuthProvider>
      <CartProvider userId={userId}>
        <BrowserRouter>
          <Alllinks />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

