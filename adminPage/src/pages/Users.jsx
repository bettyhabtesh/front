import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from "@mui/material";
import { Container, Title, Pagination } from "@mantine/core";

const Users = () => {
  const [userType, setUserType] = useState("all");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5; // 🔹 Number of rows per page

  const users = [
    { id: 1, name: "John Doe", type: "Farmer" },
    { id: 2, name: "Jane Smith", type: "Agricultural Researcher" },
    { id: 3, name: "Mark Johnson", type: "Expert" },
    { id: 4, name: "Alice Brown", type: "Farmer" },
    { id: 5, name: "Ethan Clark", type: "Expert" },
    { id: 6, name: "Olivia Davis", type: "Farmer" },
    { id: 7, name: "Emma Wilson", type: "Agricultural Researcher" },
    { id: 8, name: "Noah Moore", type: "Expert" },
    { id: 9, name: "Sophia Anderson", type: "Farmer" },
    { id: 10, name: "Liam Martinez", type: "Expert" },
    { id: 11, name: "Jane Smith", type: "Agricultural Researcher" },
    { id: 12, name: "Mark Johnson", type: "Expert" },
    { id: 13, name: "John Doe", type: "Farmer" },
    { id: 14, name: "Jane Smith", type: "Agricultural Researcher" },
    { id: 15, name: "Mark Johnson", type: "Expert" },
    { id: 16, name: "John Doe", type: "Farmer" },
    { id: 17, name: "Jane Smith", type: "Agricultural Researcher" },
    { id: 18, name: "Mark Johnson", type: "Expert" },
  ];

  const filteredUsers = userType === "all" ? users : users.filter(user => user.type === userType);
  
  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedUsers = filteredUsers.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Container>
      <Title order={2} mb="md">Users</Title>

      <Select
        value={userType}
        onChange={(e) => {
          setUserType(e.target.value);
          setPage(1); // Reset page when filter changes
        }}
        displayEmpty
        variant="outlined"
        sx={{ mb: 2 }}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="Farmer">Farmer</MenuItem>
        <MenuItem value="Agricultural Researcher">Agricultural Researcher</MenuItem>
        <MenuItem value="Expert">Expert</MenuItem>
      </Select>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>User Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.type}</TableCell>
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
      />
    </Container>
  );
};

export default Users;
