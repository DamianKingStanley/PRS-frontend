import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./SearchResultsPage.css";
import Navbar from "../../component/Navbar/Navbar";
import { FaHeart, FaBookmark, FaShoppingCart } from "react-icons/fa"; // Import icons from react-icons
import { useNavigate } from "react-router-dom";

const SearchResultsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();

  const [likedPosts, setLikedPosts] = useState([]); // Keep track of liked posts
  const [savedPosts, setSavedPosts] = useState([]); // Keep track of saved posts
  const [modalMessage, setModalMessage] = useState(""); // Modal message
  const [showModal, setShowModal] = useState(false); // Show or hide the modal
  const navigate = useNavigate();

  // Function to extract query parameter from the URL
  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  const query = useQuery().get("query");

  useEffect(() => {
    const fetchSearchResultsAndTrackQuery = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch search results by query
        const response = await axios.get(
          `https://prs-server-by31.onrender.com/products/search?query=${query}`
        );
        setProducts(response.data.products);

        // Track the search query for recommendations
        const token = sessionStorage.getItem("token"); // Retrieve token from sessionStorage
        if (token) {
          await axios.post(
            `https://prs-server-by31.onrender.com/recommendations/track/search/${query}`, // Send searchQuery as a parameter
            {}, // Empty body
            {
              headers: {
                Authorization: `Bearer ${token}`, // Send the token in the headers
              },
            }
          );
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching products.");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResultsAndTrackQuery();
    }
  }, [query]);

  const closeModal = () => {
    setTimeout(() => {
      setShowModal(false);
    }, 2000); // Automatically close after 2 seconds
  };

  // Handle like button click
  const handleLike = async (postId) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.put(
        `https://prs-server-by31.onrender.com/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLikedPosts(
        (prevLikedPosts) =>
          prevLikedPosts.includes(postId)
            ? prevLikedPosts.filter((id) => id !== postId) // Unlike post
            : [...prevLikedPosts, postId] // Like post
      );

      // Show modal with the appropriate message
      setModalMessage(
        likedPosts.includes(postId)
          ? "You unliked the post."
          : "You liked the post!"
      );
      setShowModal(true);
      closeModal();
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  // Handle save button click
  const handleSave = async (postId) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.put(
        `https://prs-server-by31.onrender.com/posts/${postId}/save`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSavedPosts(
        (prevSavedPosts) =>
          prevSavedPosts.includes(postId)
            ? prevSavedPosts.filter((id) => id !== postId) // Remove save
            : [...prevSavedPosts, postId] // Save post
      );

      // Show modal with the appropriate message
      setModalMessage(
        savedPosts.includes(postId)
          ? "Item removed from saved list."
          : "Item saved!"
      );
      setShowModal(true);
      closeModal();
    } catch (err) {
      console.error("Error saving post:", err);
    }
  };

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

  return (
    <div>
      <Navbar />
      {showModal && (
        <div className="messagemodal">
          <div className="messagemodal-content">
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
      <div className="SearchResultsPage">
        <h2>Search Results for: "{query}"</h2>

        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && products.length === 0 && (
          <p>No products found for "{query}".</p>
        )}

        <div className="product-list">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={`https://prs-server-by31.onrender.com/${product.image}`}
                alt={product.name}
                className="product-image"
              />
              <div className="product-details">
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                <p>Price: ${product.price}</p>
              </div>

              <div className="post-actions">
                <p
                  className={`like-btn ${
                    likedPosts.includes(product._id) ? "liked" : ""
                  }`}
                  onClick={() => handleLike(product._id)}
                >
                  <FaHeart />{" "}
                  {likedPosts.includes(product._id) ? "Liked" : "Like"}
                </p>

                <p
                  className={`save-btn ${
                    savedPosts.includes(product._id) ? "saved" : ""
                  }`}
                  onClick={() => handleSave(product._id)}
                >
                  <FaBookmark />{" "}
                  {savedPosts.includes(product._id) ? "Saved" : "Save"}
                </p>

                <p
                  className="cart-btn"
                  onClick={() => handleAddToCart(product._id)}
                >
                  <FaShoppingCart /> Cart
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
