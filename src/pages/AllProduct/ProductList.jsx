import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaBookmark, FaShoppingCart } from "react-icons/fa"; // Import icons from react-icons
import "./ProductList.css"; // Import your CSS
import Navbar from "../../component/Navbar/Navbar";
import Categories from "../../component/Categories/Categories";
import RecipesComponent from "../../component/Apiss/RecipesComponent";
import ProductsComponent from "../../component/Apiss/ProductComponent";
import LoadingSpinner from "../../component/LoaderSpinner/LoaderSpinner";

const ProductList = () => {
  const [posts, setPosts] = useState([]); // Posts data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  const [likedPosts, setLikedPosts] = useState([]); // Keep track of liked posts
  const [savedPosts, setSavedPosts] = useState([]); // Keep track of saved posts
  const [modalMessage, setModalMessage] = useState(""); // Modal message
  const [showModal, setShowModal] = useState(false); // Show or hide the modal

  useEffect(() => {
    // Fetch posts on component mount
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://prs-server-by31.onrender.com/posts"
        );
        const sortedPosts = response.data.fetchPosts.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt); // Sort by createdAt field
        });

        // Retrieve the current user's ID from the session
        const token = sessionStorage.getItem("token");
        const decodedToken = token
          ? JSON.parse(atob(token.split(".")[1]))
          : null;
        const userId = decodedToken ? decodedToken.userId : null;

        const updatedPosts = sortedPosts.map((post) => {
          return {
            ...post,
            liked: post.likes.includes(userId), // Check if the user has liked the post
            saved: post.saves.includes(userId), // Check if the user has saved the post
          };
        });

        // Set posts and liked/saved states
        setPosts(updatedPosts);
        setLikedPosts(
          updatedPosts.filter((post) => post.liked).map((post) => post._id)
        );
        setSavedPosts(
          updatedPosts.filter((post) => post.saved).map((post) => post._id)
        );
        setLoading(false);
      } catch (err) {
        setError("Failed to load posts.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Close modal after a few seconds
  const closeModal = () => {
    setTimeout(() => {
      setShowModal(false);
    }, 2000); // Automatically close after 2 seconds
  };

  // Handle like button click
  const handleLike = async (postId) => {
    try {
      const token = sessionStorage.getItem("token");
      const isLiked = likedPosts.includes(postId);
      await axios.put(
        `https://prs-server-by31.onrender.com/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // The backend should return the updated post object with the current likes

      setLikedPosts(
        (prevLikedPosts) =>
          isLiked
            ? // prevLikedPosts.includes(postId)
              prevLikedPosts.filter((id) => id !== postId) // Unlike post
            : [...prevLikedPosts, postId] // Like post
      );

      // Show modal with the appropriate message
      setModalMessage(
        isLiked ? "You unliked the post." : "You liked the post!"
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
      const isSaved = savedPosts.includes(postId); // Check if the post is already saved

      await axios.put(
        `https://prs-server-by31.onrender.com/posts/${postId}/save`,
        {}, // Empty body for the PUT request
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSavedPosts(
        (prevSavedPosts) =>
          isSaved
            ? prevSavedPosts.filter((id) => id !== postId) // If already saved, remove it
            : [...prevSavedPosts, postId] // If not saved, add it to the list
      );

      // Show modal with the appropriate message
      setModalMessage(
        isSaved ? "Item removed from saved list." : "Item saved!"
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

  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) return <div className="errorMessage">{error}</div>;

  return (
    <div>
      <div>
        <Navbar />
        <Categories />
        <div className="AllProductBody">
          <h1>Our Products</h1>
          <div className="post-list">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className="post-card">
                  <img
                    src={`https://prs-server-by31.onrender.com/${post.image}`}
                    alt={post.title}
                    className="post-image"
                  />
                  <div className="post-details">
                    <p>Category: {post.category}</p>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <p>Price: NGN{post.price}</p>
                  </div>

                  {/* Action buttons: Like, Save, and Add to Cart */}
                  <div className="post-actions">
                    <p
                      className={`like-btn ${
                        likedPosts.includes(post._id) ? "liked" : ""
                      }`}
                      onClick={() => handleLike(post._id)}
                    >
                      <FaHeart className="heart" />
                      {likedPosts.includes(post._id) ? "Liked" : "Like"}
                    </p>

                    <p
                      className={`save-btn ${
                        savedPosts.includes(post._id) ? "saved" : ""
                      }`}
                      onClick={() => handleSave(post._id)}
                    >
                      <FaBookmark />{" "}
                      {savedPosts.includes(post._id) ? "Saved" : "Save"}
                    </p>

                    <p
                      className="cart-btn"
                      onClick={() => handleAddToCart(post)}
                    >
                      <FaShoppingCart /> To Cart
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No posts available.</p>
            )}
          </div>
        </div>

        {/* Modal Popup */}
        {showModal && (
          <div className="messagemodal">
            <div className="messagemodal-content">
              <p>{modalMessage}</p>
            </div>
          </div>
        )}
      </div>
      <ProductsComponent />
      <RecipesComponent />
    </div>
  );
};

export default ProductList;
