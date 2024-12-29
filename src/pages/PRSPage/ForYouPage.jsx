import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ForYouPage.css";

const ForYouPage = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user")); // Assuming user info is stored under this key
    if (user && user.username) {
      setUsername(user.username); // Set the username state
    }

    const fetchRecommendations = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(
          "https://prs-server-by31.onrender.com/get/recommendations",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRecommendedProducts(response.data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, []);

  // Clear tracks function
  const clearTracks = async () => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.delete("https://prs-server-by31.onrender.com/clear/tracks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecommendedProducts([]); // Clear the displayed recommendations
    } catch (error) {
      console.error("Error clearing tracks:", error);
    }
  };

  return (
    <div className="for-you-page">
      <h2>For You, {username}</h2>
      <div className="recommended-products">
        {recommendedProducts.length > 0 ? (
          recommendedProducts.map((product) => (
            <div key={product._id} className="recommended-product">
              <img
                src={`https://prs-server-by31.onrender.com/${product.image}`}
                alt={product.title}
                className="recommended-product-image"
              />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Price: NGN{product.price}</p>
            </div>
          ))
        ) : (
          <p id="norec">No recommendations available at the moment.</p>
        )}
      </div>

      {recommendedProducts.length > 0 && (
        <button className="cleartracksbtn" onClick={clearTracks}>
          Clear
        </button>
      )}
    </div>
  );
};

export default ForYouPage;
