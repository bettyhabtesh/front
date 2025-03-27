import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Container, Title, Badge, Pagination } from "@mantine/core";

const Approvals = () => {
  const navigate = useNavigate();
  const [experts, setExperts] = useState([
    { id: 1, name: "Alice Brown", document: "certificate1.pdf", status: "pending" },
    { id: 2, name: "Bob White", document: "certificate2.pdf", status: "pending" },
    { id: 3, name: "Charlie Green", document: "certificate3.pdf", status: "approved" },
    { id: 4, name: "Daniel Carter", document: "certificate4.pdf", status: "pending" },
    { id: 5, name: "Emily Scott", document: "certificate5.pdf", status: "approved" },
    { id: 6, name: "Frank Evans", document: "certificate6.pdf", status: "pending" },
  ]);

  const [page, setPage] = useState(1);
  const rowsPerPage = 3; // 🔹 Number of rows per page

  const approveExpert = (id) => {
    setExperts(
      experts.map((expert) =>
        expert.id === id ? { ...expert, status: "approved" } : expert
      )
    );
  };

  const rejectExpert = (id) => {
    setExperts(experts.filter((expert) => expert.id !== id));
  };

  // Pagination logic
  const totalPages = Math.ceil(experts.length / rowsPerPage);
  const paginatedExperts = experts.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Container>
      <Title order={2} mb="md">Expert Approvals</Title>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Document</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedExperts.map((expert) => (
              <TableRow key={expert.id}>
                <TableCell>{expert.name}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(`/view-certificate/${expert.id}`)}
                  >
                    View Certificate
                  </Button>
                </TableCell>
                <TableCell>
                  {expert.status === "approved" ? <Badge color="green">Approved</Badge> : <Badge color="yellow">Pending</Badge>}
                </TableCell>
                <TableCell>
                  {expert.status === "pending" && (
                    <>
                      <Button variant="contained" color="success" onClick={() => approveExpert(expert.id)} sx={{ mr: 1 }}>
                        Approve
                      </Button>
                      <Button variant="contained" color="error" onClick={() => rejectExpert(expert.id)}>
                        Reject
                      </Button>
                    </>
                  )}
                </TableCell>
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

export default Approvals;
