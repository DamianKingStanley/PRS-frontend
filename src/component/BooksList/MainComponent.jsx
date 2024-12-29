import React, { useState, useEffect } from "react";
import { fetchPosts } from "./filterpost.js";
import FilterByDepartment from "./FilterByDepartment";
import FilterByCollege from "./FilterByCollege";
import FilterByLevel from "./FilterByLevel";
import "./MainComponent.css";

const MainComponent = () => {
  const [posts, setPosts] = useState([]);
  const [filters, setFilters] = useState({
    department: "",
    college: "",
    level: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalMessage, setModalMessage] = useState(""); // To hold the message
  const [showModal, setShowModal] = useState(false); // To control modal visibility

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const data = await fetchPosts(filters);
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [filters]);

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const addToCart = (post) => {
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
    <div className="main-component">
      <h1>Available Books</h1>
      <p>For Quick search, choose either the college, department or level</p>

      <div className="filters">
        <FilterByDepartment onChange={handleFilterChange} />
        <FilterByCollege onChange={handleFilterChange} />
        <FilterByLevel onChange={handleFilterChange} />
      </div>

      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      {error && <p className="error">{error}</p>}

      <div className="posts">
        {posts.length > 0 ? (
          posts
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((post) => (
              <div key={post._id} className="post">
                <img
                  src={`https://prs-server-by31.onrender.com/${post.bookcover}`}
                  alt={post.title}
                />
                <h2>{post.title}</h2>
                <p>Author: {post.author}</p>
                <p>Price: NGN{post.price}</p>
                <button onClick={() => addToCart(post)}>Add to Cart</button>
              </div>
            ))
        ) : (
          <p>No books found.</p>
        )}
      </div>

      {showModal && (
        <div className="MainComponentmodal">
          <div className="MainComponentmodal-content">
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainComponent;
