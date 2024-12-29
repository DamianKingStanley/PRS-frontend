import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cartcomponent.css";
import Navbar from "../../component/Navbar/Navbar";

// CartPage component
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCart);
  }, []);

  // Remove item from cart
  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // Remove all items from cart
  const handleRemoveAll = () => {
    setCartItems([]);
    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  return (
    <div className="CartComponent">
      <Navbar />
      <div className="cart-page">
        <h2>Your Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-image">
                  <img
                    src={`https://prs-server-by31.onrender.com/${item.image}`}
                    alt={item.title}
                  />
                </div>
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>Category: {item.category}</p>
                  <p>Price:NGN{item.price}</p>
                </div>
                <div className="cart-item-actions">
                  <button
                    className="remove-item-btn"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-summary">
              <button className="clear-cart-btn" onClick={handleRemoveAll}>
                Clear All Items
              </button>
            </div>

            <div className="cart-buttons">
              <Link to="/">
                <button className="continue-shopping-btn">
                  Continue Shopping
                </button>
              </Link>
              {/* <button className="checkout-btn">Proceed to Checkout</button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
