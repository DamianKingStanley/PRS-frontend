import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RecipesComponent.css";
import LoadingSpinner from "../LoaderSpinner/LoaderSpinner";
import { FaHeart, FaBookmark } from "react-icons/fa"; // Import icons from react-icons

const RecipesComponent = () => {
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRecipe, setExpandedRecipe] = useState(null); // Store the expanded recipe ID

  const [likedPosts, setLikedPosts] = useState([]); // Keep track of liked posts
  const [savedPosts, setSavedPosts] = useState([]); // Keep track of saved posts
  const [modalMessage, setModalMessage] = useState(""); // Modal message
  const [showModal, setShowModal] = useState(false); //

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/recipes");
        setRecipes(response.data.recipes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
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

  const toggleInstructions = (recipeId) => {
    // Toggle between expanded and collapsed instructions
    if (expandedRecipe === recipeId) {
      setExpandedRecipe(null); // Collapse
    } else {
      setExpandedRecipe(recipeId); // Expand
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="RecipeComponentBody">
      {showModal && (
        <div className="messagemodal">
          <div className="messagemodal-content">
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
      <h1>Some Food Recipe you may like</h1>
      <div className="recipes-container">
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div className="recipe-card" key={recipe.id}>
              <h2>{recipe.name}</h2>

              {/* Show full instructions if expanded, else show part */}
              <p>
                {Array.isArray(recipe.instructions)
                  ? expandedRecipe === recipe.id
                    ? recipe.instructions.join(" ") // Show full instructions
                    : recipe.instructions.slice(0, 2).join(" ") + "..." // Show partial
                  : "Instructions not available"}
              </p>

              <div className="post-actions">
                <p
                  className="toggle-button"
                  onClick={() => toggleInstructions(recipe.id)}
                >
                  {expandedRecipe === recipe.id ? "Show Less" : "Show More"}
                </p>
                <p
                  className={`like-btn ${
                    likedPosts.includes(recipe.id) ? "liked" : ""
                  }`}
                  onClick={() => handleLike(recipe.id)}
                >
                  <FaHeart />{" "}
                  {likedPosts.includes(recipe.id) ? "Liked" : "Like"}
                </p>

                <p
                  className={`save-btn ${
                    savedPosts.includes(recipe.id) ? "saved" : ""
                  }`}
                  onClick={() => handleSave(recipe.id)}
                >
                  <FaBookmark />{" "}
                  {savedPosts.includes(recipe.id) ? "Saved" : "Save"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div>No recipes available</div>
        )}
      </div>
    </div>
  );
};

export default RecipesComponent;
