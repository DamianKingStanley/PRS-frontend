import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./PostsDisplay.css"; // Create a CSS file for styling

const PostsDisplay = () => {
  const { userId } = useParams(); // Assuming you pass userId in the URL
  const [likedPosts, setLikedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `https://prs-server-by31.onrender.com/user/${userId}/posts`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Add token
            },
          }
        );

        setLikedPosts(response.data.likedPosts);
        setSavedPosts(response.data.savedPosts);
      } catch (err) {
        setError(
          err.response ? err.response.data.message : "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="posts-display">
      <h2>Liked Posts</h2>
      <div className="yourlikedposts">
        {likedPosts.length > 0 ? (
          likedPosts.map((post) => (
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
                <p>Price: ${post.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No liked posts available.</p>
        )}
      </div>

      <h2>Saved Posts</h2>
      <div className="yourlikedposts">
        {savedPosts.length > 0 ? (
          savedPosts.map((post) => (
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
                <p>Price: ${post.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No saved posts available.</p>
        )}
      </div>
    </div>
  );
};

export default PostsDisplay;
