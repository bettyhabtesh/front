/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { Container, Title, Pagination } from "@mantine/core";
import "../App.css";
import { fetchUsers, setAuthToken } from "../services/authService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [userType, setUserType] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const rowsPerPage = 8;

useEffect(() => {
  const fetchData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. User may not be logged in.");
      setLoading(false);
      return;
    }

    try {
      setAuthToken(token); // <-- Make sure this is called before fetchUsers
      const data = await fetchUsers(); // Should return array of users
      setUsers(data);
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);
  

  const filteredUsers =
    userType === "all" ? users : users.filter((user) => user.role === userType);

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  if (loading) {
    return (
      <Container
        className="users-container"
        style={{ textAlign: "center", marginTop: "50px" }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container className="users-container">
      <Title order={2} mb="md" className="users-title">
        Users
      </Title>

      <Select
        value={userType}
        onChange={(value) => {
          setUserType(value);
          setPage(1);
        }}
        displayEmpty
        variant="outlined"
        sx={{ mb: 2 }}
        className="users-select"
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="farmer">Farmer</MenuItem>
        <MenuItem value="researcher">Agricultural Researcher</MenuItem>
        <MenuItem value="expert">Expert</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </Select>

      <TableContainer component={Paper} className="users-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        total={totalPages}
        value={page}
        onChange={setPage}
        mt="md"
        size="sm"
        color="blue"
        className="users-pagination"
      />
    </Container>
  );
};

export default Users;
