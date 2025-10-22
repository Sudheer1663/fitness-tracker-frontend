// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Cart.css";

// function Cart() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(savedCart);
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark") setDarkMode(true);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const removeItem = (id) => {
//     setCart(cart.filter((item) => item.id !== id));
//   };

//   const clearCart = () => {
//     if (window.confirm("Are you sure you want to clear the cart?")) {
//       setCart([]);
//     }
//   };

//   const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

//   return (
//     <div className={`cart-container ${darkMode ? "dark-mode" : "light-mode"}`}>
//       <div className="container py-4">
//         <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
//           <h2>🛒 Your Cart</h2>
//           <button
//             className="btn btn-outline-secondary"
//             onClick={() => setDarkMode(!darkMode)}
//           >
//             {darkMode ? "☀️ Light" : "🌙 Dark"}
//           </button>
//         </div>

//         {cart.length === 0 ? (
//           <div className={`alert alert-warning text-center`}>
//             Your cart is empty! Go add some fitness products. 💪
//           </div>
//         ) : (
//           <>
//             <div className="row">
//               {cart.map((item, index) => (
//                 <div key={index} className="col-md-4 mb-4">
//                   <div className={`card product-card ${darkMode ? "bg-secondary text-light" : ""}`}>
//                     <img src={item.image} alt={item.name} className="card-img-top product-img" />
//                     <div className="card-body text-center">
//                       <h5 className="card-title">{item.name}</h5>
//                       <p className="text-muted mb-2">{item.category}</p>
//                       <h6>₹{item.price}</h6>
//                       <button className="btn btn-danger mt-2 w-100" onClick={() => removeItem(item.id)}>
//                         ❌ Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-2">
//               <h4>Total: ₹{totalPrice}</h4>
//               <div>
//                 <button className="btn btn-warning me-2" onClick={clearCart}>
//                   Clear Cart
//                 </button>
//                 <button className="btn btn-success">
//                   Checkout
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Cart;










import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCartItems, removeFromCart } from "../services/CartApi";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const userId = 1; // Replace with actual logged-in user ID

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const items = await getCartItems(userId);
      setCart(items);
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await removeFromCart(itemId);
      loadCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  return (
    <div className="container py-4">
      <h2>🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="list-group">
          {cart.map((item) => (
            <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>{item.title}</h5>
                <p>Type: {item.type} | Level: {item.level} | Duration: {item.duration} min | Cost: ${item.cost}</p>
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>⬅ Back</button>
    </div>
  );
}

export default Cart;
