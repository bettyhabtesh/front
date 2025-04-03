import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Container } from "@mantine/core";
import { Sidebar } from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Approvals from "./pages/Approval";
import ViewCertificate from "./pages/ViewCertificate";
import Sende from "./pages/Login";
import { useEffect, useState } from "react";  
import "./App.css"; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard"); // Redirect to dashboard if logged in
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="app-container">
      {isLoggedIn && <Sidebar />}
      <Container fluid className="main-content">
        <Routes>
          <Route path="/login" element={<Sende />} />
          <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />} />
          <Route path="/users" element={isLoggedIn ? <Users /> : <Navigate to="/login" replace />} />
          <Route path="/approvals" element={isLoggedIn ? <Approvals /> : <Navigate to="/login" replace />} />
          <Route path="/view-certificate/:id" element={isLoggedIn ? <ViewCertificate /> : <Navigate to="/login" replace />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
