import React, { useState } from "react";
import "./Logout.css";

const Logout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isLoggedIn = !!sessionStorage.getItem("user"); // Check if user is logged in

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.clear();
    window.location.href = "/login";
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!isLoggedIn) {
    return null; // Do not render the component if the user is not logged in
  }

  return (
    <div className="LogoutComponent">
      <button onClick={openModal}>Logout</button>
      {isModalOpen && (
        <div className="Logout-modal-overlay">
          <div className="logout-modal">
            <h2>Are you sure?</h2>
            <div className="modal-buttons">
              <button onClick={handleLogout}>Yes, log out</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;
