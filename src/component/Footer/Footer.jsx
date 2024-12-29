import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"; // Assuming you have a CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Hotlines:</p>
          <p>
            <a href="tel:+08161151551">09081090810</a>
          </p>
          <p>
            Umudike Rd, Umudike 440101, Abia Michael Okpara University of
            Agriculture, Umudike, address
          </p>
          <p>
            <a href="mailto:info@ebookshop.com">info@e-bookshop.com</a>
          </p>
        </div>
        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/download-support">Download Support</Link>
            </li>
            <li>
              <Link to="/editorial-policy">Editorial Policy</Link>
            </li>
            <li>
              <Link to="/educational-videos">Free Educational Videos</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section about">
          <h3>About</h3>
          <ul>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/return-policy">Return Policy</Link>
            </li>
            <li>
              <Link to="/terms-conditions">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/affiliate-marketing">Affiliate Marketing</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section more">
          <h3>More</h3>
          <ul>
            <li>
              <Link to="/blog">Our Blog</Link>
            </li>
            <li>
              <Link to="/my-account">My Account</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/register-publisher">Register as Publisher</Link>
            </li>
            <li>
              <Link to="/start-earning">Start Earning</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024, All Rights Reserved. Mouau Bookshop.</p>
        <p>Web design by DS Tech</p>
        <p>Our online payment is 100% safe and secure.</p>
      </div>
    </footer>
  );
};

export default Footer;
