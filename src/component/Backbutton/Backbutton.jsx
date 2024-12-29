import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Backbutton.css";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="back-button" onClick={handleBackClick}>
      <FaArrowLeft className="back-icon" />
      <p>Back</p>
    </div>
  );
};

export default BackButton;
