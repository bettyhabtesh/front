/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import backgroundImage from "../Assets/sende.png";

function Sende({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login success
    localStorage.setItem("isLoggedIn", "true");
    onLogin(); // Update App state
    navigate("/dashboard"); // Navigate after login
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
