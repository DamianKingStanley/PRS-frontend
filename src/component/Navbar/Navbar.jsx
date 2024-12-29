import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [userid, setUserId] = useState("");

  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.username) {
      setUsername(user.username);
    }
  }, []);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.id) {
      setUserId(user.id);
    }
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/product/search?query=${searchQuery}`;
    }
  };

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      sessionStorage.clear(); // Clear session storage on logout
      navigate("/login");
    }, 2000);
  };

  return (
    <nav className="Navbar">
      <div className="NavbarContainer">
        <div className="Logo">
          <Link to="/">PRS</Link>
        </div>
        <form className="SearchBar" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <div className="MobileMenuIcon" onClick={() => setIsMobile(!isMobile)}>
          {isMobile ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={isMobile ? "NavActions active" : "NavActions"}>
          <li className="NavItem">
            <Link to="/cart">Cart</Link>
          </li>
          <li
            className="NavItem Account"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <span className="Account">Welcome, {username || "Guest"}</span>
            <ul
              className={isDropdownOpen ? "DropdownMenu open" : "DropdownMenu"}
            >
              <li>
                <Link to={`/user/profile/${userid}`}>Dashboard</Link>
              </li>
              <li>
                <button className="logoutbutton" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </li>
        </ul>
        {loggingOut && <div className="LoggingOutMessage">Logging out...</div>}
      </div>
    </nav>
  );
};

export default Navbar;
