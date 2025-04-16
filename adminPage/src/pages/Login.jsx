/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import backgroundImage from "../Assets/sende.png";
import { login, setAuthToken } from "../services/authService";

function Sende({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For displaying errors
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const { access, refresh } = await login(email, password);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", access); // <-- store access token
      localStorage.setItem("refreshToken", refresh); // optional if you use it later
      setAuthToken(access); // <-- use access token for auth headers
      onLogin();
      navigate("/dashboard");
    } catch (error) {
      const errorMsg =
        error.response?.data?.detail || // <- Django SimpleJWT returns this
        error.response?.data?.message ||
        "Login failed. Please try again.";
      setError(errorMsg);
    }
  };
  

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Sende</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Sende;
