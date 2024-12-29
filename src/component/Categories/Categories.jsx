import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Categoreis.css";

const Categories = () => {
  const [categories] = useState([
    "footwear",
    "clothes",
    "gadgets",
    "makeup",
    "electronics",
    "appliances",
    "cap",
    "female-wear",
  ]);

  const navigate = useNavigate();

  // Handle category click
  const handleCategoryClick = (category) => {
    // Navigate to the new page with the selected category
    navigate(`/category/${category}`);
  };

  return (
    <div className="CateoriesBody">
      <h2>Select a Category</h2>
      <div className="category-list">
        {categories.map((category) => (
          <button
            key={category}
            className="category-btn"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
