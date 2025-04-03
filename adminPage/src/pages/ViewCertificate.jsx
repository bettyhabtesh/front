import { useParams, useNavigate } from "react-router-dom";
import { Container, Title, ActionIcon, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import "../App.css"; 

const ViewCertificate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Example static data for demonstration
  const certificates = {
    1: "certificate1.pdf",
    2: "certificate2.pdf",
    3: "certificate3.pdf",
    4: "certificate4.pdf",
    5: "certificate5.pdf",
    6: "certificate6.pdf",
  };

  const document = certificates[id];

  return (
    <Container className="view-certificate-container">
      {/* Back Arrow Navigation */}
      <div className="back-button" onClick={() => navigate("/approvals")}>
        <ActionIcon size="lg" variant="light">
          <IconArrowLeft size={24} />
        </ActionIcon>
      </div>
{/*      <Title order={2} mb="md">View Certificate</Title>
      {document ? (
        // <iframe src={/${document}} width="100%" height="500px" title="Certificate"></iframe>
        document
      ) : (
        <p>No certificate found.</p>
      )}*/}
      <Title order={2} mb="md">View Certificate</Title>

      {document ? (
        document
      ) : (
        <p className="no-certificate">No certificate found.</p>
      )}
    </Container>
  );
};

export default ViewCertificate;
