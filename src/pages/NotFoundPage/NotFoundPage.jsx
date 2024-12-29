import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css"; // Optional, if you want to add some styling

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist.</p>
      <Link to="/" className="home-link">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
