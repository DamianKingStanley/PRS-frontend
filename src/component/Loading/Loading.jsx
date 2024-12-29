import React from "react";
import logo1 from "../../assets/inkypenbck.jpg";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      {/* <img className="logo1" src={logo1} alt="Logo" /> */}
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loading;
