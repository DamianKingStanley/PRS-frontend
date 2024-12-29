import React, { useState } from "react";
import axios from "axios";
import "./Search.css"; // Import the CSS file

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true); // Show loader
    setError(""); // Clear previous errors
    try {
      const response = await axios.get(
        `https://prs-server-by31.onrender.com/post/book/search?title=${searchTerm}`
      );
      onSearch(response.data);
    } catch (error) {
      setError("An error occurred while searching. Please try again.");
      console.error("Error searching for books:", error);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by title"
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
      {loading && <div className="loader"></div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Search;
