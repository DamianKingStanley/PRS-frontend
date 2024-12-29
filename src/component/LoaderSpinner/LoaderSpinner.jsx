import React from "react";
import "./LoaderSpinner.css"; // Import the CSS file

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p></p>
    </div>
  );
};

export default LoadingSpinner;
