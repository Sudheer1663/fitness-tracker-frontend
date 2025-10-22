import React, { useEffect, useState } from "react";
import { getCartItems, getCartTotal, clearCart } from "../services/Api";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const userId = 1; // Temporary userId, replace with logged-in user later
  const navigate = useNavigate();

  // Fetch cart data
  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const items = await getCartItems(userId);
      setCartItems(items);
      const totalCost = await getCartTotal(userId);
      setTotal(totalCost);
    } catch (err) {
      console.error("Error fetching cart data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      await clearCart(userId);
      setCartItems([]);
      setTotal(0);
      alert("Cart cleared successfully!");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">🛒 My Cart</h2>
        <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="alert alert-info text-center">
          Your cart is empty. <br />
          <button className="btn btn-primary mt-3" onClick={() => navigate("/stayfit")}>
            Browse Plans
          </button>
        </div>
      ) : (
        <>
          <div className="row">
            {cartItems.map((item) => (
              <div className="col-md-4 mb-4" key={item.id}>
                <div className="card shadow-sm h-100 border-0">
                  <div className="card-body">
                    <h5 className="card-title text-primary">{item.title}</h5>
                    <p className="card-text mb-1">
                      <strong>Type:</strong> {item.type}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Level:</strong> {item.level}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Duration:</strong> {item.duration} days
                    </p>
                    <p className="card-text">
                      <strong>Cost:</strong> ₹{item.cost}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-end mt-4">
            <h4 className="fw-bold">Total: ₹{total}</h4>
            <button className="btn btn-danger mt-3 me-2" onClick={handleClearCart}>
              Clear Cart
            </button>
            <button className="btn btn-success mt-3">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
