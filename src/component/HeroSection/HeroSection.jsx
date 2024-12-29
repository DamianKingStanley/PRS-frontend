import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";
import imageHero from "../../assets/hero_section_intro.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  // Check if user is logged in by looking for 'userInfo' in sessionStorage
  const isLoggedIn = !!sessionStorage.getItem("user");

  // Handle button click
  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate("/products");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="heroSectionBody">
      <section className="heroSectionContent">
        <div className="heroTextContainer">
          <h1 className="heroTitle">
            Personalized Recommendation System - PRS
          </h1>
          <p className="heroDescription">
            Discover a world tailored just for you! Our advanced recommendation
            system analyzes your preferences to offer personalized suggestions.
          </p>
          <button className="getStartedButton" onClick={handleButtonClick}>
            {isLoggedIn ? "Products" : "Get Started"}
          </button>
        </div>
        <div className="heroImageContainer">
          <img src={imageHero} alt="Hero" className="heroImage" />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
