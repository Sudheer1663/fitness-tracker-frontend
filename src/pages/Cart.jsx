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
import { getCartItems, removeFromCart, clearCartApi, getCartTotal } from "../services/CartApi";
import "bootstrap/dist/css/bootstrap.min.css";

function Cart() {
  const navigate = useNavigate();
  const userId = 14; // replace with logged-in user ID
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const items = await getCartItems(userId);
      setCartItems(items);
      const sum = await getCartTotal(userId);
      setTotal(sum);
    } catch (error) {
      console.error("Error fetching cart:", error);
      alert("Failed to load your plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeFromCart(id);
      await fetchCart(); // Refresh cart after removal
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item. Please try again.");
    }
  };

  const handleClearCart = async () => {
    if (window.confirm("Are you sure you want to clear your entire plan?")) {
      try {
        await clearCartApi(userId);
        await fetchCart(); // Refresh cart after clearing
      } catch (error) {
        console.error("Error clearing cart:", error);
        alert("Failed to clear plan. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: "80px" }}>
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: "80px" }}>
      <button className="btn btn-outline-secondary mb-3" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
      <h2>🛒 My Plan</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <p className="fs-5">Your plan is empty 😔</p>
          <button className="btn btn-primary" onClick={() => navigate("/loseweight")}>
            Browse Exercises
          </button>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Exercise</th>
                  <th>Duration</th>
                  <th>Cost</th>
                  <th>Level</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        {item.imageData && (
                          <img 
                            src={`data:image/jpeg;base64,${item.imageData}`}
                            alt={item.title}
                            style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px", marginRight: "10px" }}
                          />
                        )}
                        <span>{item.title}</span>
                      </div>
                    </td>
                    <td>{item.duration} min</td>
                    <td>${item.cost}</td>
                    <td>
                      <span className={`badge ${
                        item.level === 'BEGINNER' ? 'bg-success' : 
                        item.level === 'INTERMEDIATE' ? 'bg-warning' : 'bg-danger'
                      }`}>
                        {item.level}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${
                        item.type === 'CARDIO' ? 'bg-primary' : 
                        item.type === 'STRENGTH' ? 'bg-secondary' : 'bg-info'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn btn-danger btn-sm" 
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4 p-3 bg-light rounded">
            <h4 className="mb-0">Total Cost: ${total}</h4>
            <div>
              <button className="btn btn-warning me-2" onClick={handleClearCart}>
                Clear Plan
              </button>
              <button className="btn btn-success" onClick={() => alert("Checkout functionality would go here!")}>
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

