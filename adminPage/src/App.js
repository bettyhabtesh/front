import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@mantine/core";
import { Sidebar } from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Approvals from "./pages/Approval";
import ViewCertificate from "./pages/ViewCertificate";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <Container style={{ flex: 1, padding: "20px" }}>
        <Routes>
         <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/approvals" element={<Approvals />} />
          <Route path="/view-certificate/:id" element={<ViewCertificate />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
