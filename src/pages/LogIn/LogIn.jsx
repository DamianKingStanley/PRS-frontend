import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import "./LogIn.css";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState(""); // For error messages
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://prs-server-by31.onrender.com/user/login",
        {
          username,
          password,
          role,
        }
      );

      const { result, token } = response.data;

      if (!result || !token) {
        throw new Error("Missing user data or token in response");
      }

      // Store user data and token in sessionStorage
      sessionStorage.setItem("user", JSON.stringify(result));
      sessionStorage.setItem("token", token);

      // Redirect based on role
      if (role === "admin") {
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginsection">
      <div className="LoginBody">
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div>
            <h3>Sign In to Get Started</h3>
          </div>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            id="username"
            required
          />
          <div className="pswd-container">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              id="Password"
              required
            />
            <span
              className="pswd-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <label>
            {/* Role: <br /> */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              id="role"
            >
              <option value="user">user</option>
            </select>
          </label>
          <br />
          <button type="submit" id="submitLoginbtn" disabled={loading}>
            {loading ? <div className="button-loader"></div> : "Log In"}
          </button>
          <div className="toRegister">
            <p>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
