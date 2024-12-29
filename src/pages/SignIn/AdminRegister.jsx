import React, { useState } from "react";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminRegister = () => {
  const navigate = useNavigate();

  const [fullname, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [role, setRole] = useState("admin");
  const [secretKey, setSecretKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const submitForm = async () => {
    try {
      setLoading(true);
      if (password === confirmPassword) {
        const response = await fetch(
          "https://prs-server-by31.onrender.com/user/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fullname,
              username,
              email,
              phone,
              password,
              role,
              secretKey,
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setRegisterMessage("Registered successfully. Please Log in now");
          setLoading(false);

          navigate("/admin/sign-in");
        } else {
          const errorResponseData = await response.json();
          setRegisterMessage(
            errorResponseData.message || "Registration failed. Try again later."
          );
          setLoading(false);
        }
      } else {
        setPasswordMatch(false);
        setLoading(false);
      }
    } catch (error) {
      setRegisterMessage("Registration failed. Try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="SignInbody">
      <section className="register">
        {registerMessage && (
          <div
            className={
              registerMessage === "Registered successfully"
                ? "success-message"
                : "error-message"
            }
          >
            {registerMessage}
          </div>
        )}
        <h1>Admin Sign Up</h1>
        <div id="registerform">
          <div className="row">
            <div className="form-group">
              <input
                type="text"
                id="FullName"
                placeholder="Enter your Full Name"
                required
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="Username"
                placeholder="Choose your username"
                required
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <input
                type="email"
                id="emailAddress"
                placeholder="Enter valid email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                id="phoneNumber"
                placeholder="Enter phone number"
                required
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                required
                onChange={handlePasswordChange}
              />
              {/* <i className="password-toggle1" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </i> */}
            </div>
            <div className="form-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm Password"
                required
                onChange={handleConfirmPasswordChange}
              />
              {/* <i
                className="password-toggle"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </i> */}
              {!passwordMatch && (
                <div id="passwordmatchAlert">Passwords do not match</div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <select id="" required onChange={(e) => setRole(e.target.value)}>
                <option value="admin">admin</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="password"
                id=""
                placeholder="Admin secret key"
                required={role === "admin"}
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" disabled={loading} onClick={submitForm}>
            {loading ? <div className="button-loader"></div> : "Register"}
          </button>
          <div id="already">Already registered? Scroll up to Sign Up</div>
        </div>
      </section>
    </div>
  );
};

export default AdminRegister;
