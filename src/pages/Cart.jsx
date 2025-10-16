import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Cart.css";

function Cart() {
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      setCart([]);
    }
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className={`cart-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
          <h2>🛒 Your Cart</h2>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {cart.length === 0 ? (
          <div className={`alert alert-warning text-center`}>
            Your cart is empty! Go add some fitness products. 💪
          </div>
        ) : (
          <>
            <div className="row">
              {cart.map((item, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <div className={`card product-card ${darkMode ? "bg-secondary text-light" : ""}`}>
                    <img src={item.image} alt={item.name} className="card-img-top product-img" />
                    <div className="card-body text-center">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="text-muted mb-2">{item.category}</p>
                      <h6>₹{item.price}</h6>
                      <button className="btn btn-danger mt-2 w-100" onClick={() => removeItem(item.id)}>
                        ❌ Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-2">
              <h4>Total: ₹{totalPrice}</h4>
              <div>
                <button className="btn btn-warning me-2" onClick={clearCart}>
                  Clear Cart
                </button>
                <button className="btn btn-success">
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
