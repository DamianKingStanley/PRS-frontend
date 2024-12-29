import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CategoryPage.css";
import Navbar from "../../component/Navbar/Navbar";
import { FaHeart, FaBookmark, FaShoppingCart } from "react-icons/fa"; // Import icons from react-icons
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [likedPosts, setLikedPosts] = useState([]); // Keep track of liked posts
  const [savedPosts, setSavedPosts] = useState([]); // Keep track of saved posts
  const [modalMessage, setModalMessage] = useState(""); // Modal message
  const [showModal, setShowModal] = useState(false); // Show or hide the modal
  const navigate = useNavigate();

  // Fetch posts and track category click
  useEffect(() => {
    const fetchPostsAndTrackCategory = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch posts by category
        const response = await axios.get(
          `https://prs-server-by31.onrender.com/posts/category/${category}`
        );
        setPosts(response.data.posts);

        // Track the category click for recommendations
        const token = sessionStorage.getItem("token"); // Retrieve token from localStorage
        await axios.post(
          `https://prs-server-by31.onrender.com/recommendations/track/${category}`,
          {}, // No data body needed for this post request
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send the token in the headers
            },
          }
        );
      } catch (err) {
        setError("Error fetching posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostsAndTrackCategory();
  }, [category]);

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
      <div className="CategoryPageBody">
        <h2> {category}</h2>
        <div className="posts-section">
          {loading ? (
            <p>Loading posts...</p>
          ) : error ? (
            <p>{error}</p>
          ) : posts.length === 0 ? (
            <p>No products yet in {category}.</p>
          ) : (
            <div className="category-list">
              {posts.map((post) => (
                <div key={post._id} className="category-card">
                  <img
                    src={`https://prs-server-by31.onrender.com/${post.image}`}
                    alt={post.title}
                    className="post-image"
                  />
                  <div className="category-details">
                    <p>Category: {post.category}</p>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <p>Price: NGN{post.price}</p>
                  </div>

                  <div className="post-actions">
                    <p
                      className={`like-btn ${
                        likedPosts.includes(post._id) ? "liked" : ""
                      }`}
                      onClick={() => handleLike(post._id)}
                    >
                      <FaHeart />{" "}
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
                      onClick={() => handleAddToCart(post._id)}
                    >
                      <FaShoppingCart /> Cart
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
