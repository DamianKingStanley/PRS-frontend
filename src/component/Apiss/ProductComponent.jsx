import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductsComponent.css"; // Make sure to style this component
import { FaHeart, FaBookmark, FaShoppingCart } from "react-icons/fa"; // Import icons from react-icons
import LoadingSpinner from "../LoaderSpinner/LoaderSpinner";

const ProductsComponent = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [likedPosts, setLikedPosts] = useState([]); // Keep track of liked posts
  const [savedPosts, setSavedPosts] = useState([]); // Keep track of saved posts
  const [modalMessage, setModalMessage] = useState(""); // Modal message
  const [showModal, setShowModal] = useState(false); // Show or hide the modal

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products); // Get the list of products
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Close modal after a few seconds
  const closeModal = () => {
    setTimeout(() => {
      setShowModal(false);
    }, 2000); // Automatically close after 2 seconds
  };

  // Handle like button click
  const handleLike = async (productId) => {
    try {
      // Retrieve the user from sessionStorage and check if it exists
      const storedUser = sessionStorage.getItem("user");

      if (!storedUser) {
        console.error("User not found in sessionStorage.");
        return;
      }

      // Parse the string to an object
      const user = JSON.parse(storedUser);

      // Extract token from sessionStorage
      const token = sessionStorage.getItem("token");

      // Safely access userId
      const userId = user.id;

      await axios.put(
        `https://prs-server-by31.onrender.com/dummy/like`,
        { userId, productId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the Authorization header
          },
        }
      );

      // Update liked posts state
      setLikedPosts(
        (prevLikedPosts) =>
          prevLikedPosts.includes(productId)
            ? prevLikedPosts.filter((id) => id !== productId) // Remove like
            : [...prevLikedPosts, productId] // Add like
      );

      // Update modal message
      setModalMessage(
        likedPosts.includes(productId)
          ? "You unliked the product."
          : "You liked the product!"
      );
      setShowModal(true);
      closeModal();
    } catch (err) {
      console.error("Error liking product:", err);
    }
  };

  const handleSave = async (productId) => {
    try {
      const storedUser = sessionStorage.getItem("user");

      if (!storedUser) {
        console.error("User not found in sessionStorage.");
        return;
      }

      // Parse the string to an object
      const user = JSON.parse(storedUser);

      // Extract token from sessionStorage
      const token = sessionStorage.getItem("token");

      // Safely access userId
      const userId = user.id;
      await axios.put(
        `https://prs-server-by31.onrender.com/dummy/save`,
        { userId, productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSavedPosts((prevSavedPosts) =>
        prevSavedPosts.includes(productId)
          ? prevSavedPosts.filter((id) => id !== productId)
          : [...prevSavedPosts, productId]
      );

      setModalMessage(
        savedPosts.includes(productId)
          ? "Item removed from saved list."
          : "Item saved!"
      );
      setShowModal(true);
      closeModal();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  // Handle add to cart
  const handleAddToCart = (post) => {
    const isLoggedIn = sessionStorage.getItem("user");

    if (!isLoggedIn) {
      setModalMessage("You must log in first");
      setShowModal(true);
      setTimeout(() => setShowModal(false), 3000); // Hide after 3 seconds
      window.location.href = "/login"; // Redirect to login page
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    cart.push(post);
    localStorage.setItem("cartItems", JSON.stringify(cart));
    setModalMessage(`${post.title} has been added to your cart!`);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000); // Hide after 3 seconds
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="ProductComponentBody">
      {showModal && (
        <div className="messagemodal">
          <div className="messagemodal-content">
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
      <h1>More Products</h1>
      <div className="products-container">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.images[0]} alt={product.title} />
              </div>
              <h2>{product.title}</h2>
              <p className="category">{product.category}</p>
              <p className="price">NGN{product.price}</p>

              <div className="post-actions">
                <p
                  className={`like-btn ${
                    likedPosts.includes(product.id) ? "liked" : ""
                  }`}
                  onClick={() => handleLike(product.id)}
                >
                  <FaHeart />{" "}
                  {likedPosts.includes(product.id) ? "Liked" : "Like"}
                </p>

                <p
                  className={`save-btn ${
                    savedPosts.includes(product.id) ? "saved" : ""
                  }`}
                  onClick={() => handleSave(product.id)}
                >
                  <FaBookmark />{" "}
                  {savedPosts.includes(product.id) ? "Saved" : "Save"}
                </p>

                <p
                  className="cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  <FaShoppingCart /> To Cart
                </p>
              </div>
            </div>
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>
    </div>
  );
};

export default ProductsComponent;
