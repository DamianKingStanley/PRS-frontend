import React, { useState, useEffect } from "react";
import "./Home.css";
import HeroSection from "../../component/HeroSection/HeroSection";
import ForYouPage from "../PRSPage/ForYouPage";

const Home = () => {
  return (
    <div className="HomepageBody">
      <HeroSection />
      <ForYouPage />
    </div>
  );
};

export default Home;
