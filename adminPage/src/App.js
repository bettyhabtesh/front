/** @format */

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Approvals from "./pages/Approval";
import ViewCertificate from "./pages/ViewCertificate";
import Sende from "./pages/Login";
import { useState, useEffect } from "react";
import "./App.css";
import { setAuthToken } from "./services/authService";

const token = localStorage.getItem("token");
if (token) {
  setAuthToken(token);
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const location = useLocation();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="app-container">
      {isLoggedIn && location.pathname !== "/login" && <Sidebar />}

      <div className="main-content">
        <Routes>
          <Route
            path="/login"
            element={<Sende onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route
            path="/"
            element={
              <Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />
            }
          />
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/users"
            element={isLoggedIn ? <Users /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/approvals"
            element={
              isLoggedIn ? <Approvals /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/view-certificate/:id"
            element={
              isLoggedIn ? (
                <ViewCertificate />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
