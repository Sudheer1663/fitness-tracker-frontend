import React, { useState, useEffect,useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Store.css";
import { AuthContext } from "../contexts/Authcontext";
import { useNavigate } from "react-router-dom";

function Store() {
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState("All");

  const products = [
    { id: 1, name: "Dumbbell Set (20kg)", price: 1499, category: "Equipment", image: "https://images.unsplash.com/photo-1584467735871-b0a2b1e201f1?auto=format&fit=crop&w=500&q=60" },
    { id: 2, name: "Yoga Mat", price: 799, category: "Accessories", image: "https://images.unsplash.com/photo-1608874973459-d395b21b9c29?auto=format&fit=crop&w=500&q=60" },
    { id: 3, name: "Protein Powder (1kg)", price: 2499, category: "Supplements", image: "https://images.unsplash.com/photo-1598971639058-fb00ebd72ecb?auto=format&fit=crop&w=500&q=60" },
    { id: 4, name: "Resistance Bands", price: 699, category: "Equipment", image: "https://images.unsplash.com/photo-1616690729409-23ce9b1a6b8f?auto=format&fit=crop&w=500&q=60" },
    { id: 5, name: "Shaker Bottle", price: 299, category: "Accessories", image: "https://images.unsplash.com/photo-1618354691449-6c83dabe3c5c?auto=format&fit=crop&w=500&q=60" },
    { id: 6, name: "Multivitamin Tablets", price: 999, category: "Supplements", image: "https://images.unsplash.com/photo-1615485299673-7fdcf5a4f8c1?auto=format&fit=crop&w=500&q=60" },
  ];
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login"); 
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleFilterChange = (category) => setFilter(category);

  const filteredProducts =
    filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <div className={`store-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <h2>🏪 Fitness Store</h2>
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
            <button className="btn btn-primary">
              🛒 Cart ({cart.length})
            </button>
          </div>
        </div>

        <div className="mb-4 text-center">
          <div className="btn-group">
            {["All", "Equipment", "Supplements", "Accessories"].map((cat) => (
              <button
                key={cat}
                className={`btn btn-${filter === cat ? "primary" : "outline-primary"}`}
                onClick={() => handleFilterChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card product-card shadow-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="card-img-top product-img"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="text-muted mb-2">{product.category}</p>
                  <h6>₹{product.price}</h6>
                  <button
                    className="btn btn-success w-100 mt-2"
                    onClick={() => addToCart(product)}
                  >
                    ➕ Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="alert alert-warning text-center mt-4">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
}

export default Store;
