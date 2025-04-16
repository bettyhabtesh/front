import React from "react";
import { Container, Title, Text, Paper, RingProgress, SimpleGrid, Center, Group, Card, Divider, Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  IconUsers,
  IconPlant,
  IconFileSearch,
  IconCheck,
  IconAlertCircle,
} from "@tabler/icons-react"; // Import additional icons
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import "../App.css";

// Icons for stats
const icons = {
  "Total Users": IconUsers,
  Farmers: IconPlant,
  Researchers: IconFileSearch,
  Experts: IconCheck,
};

// Dummy stats (Replace with actual data from API or state)
const statsData = [
  {
    label: "Total Users",
    stats: "1,250",
    progress: 70,
    color: "blue",
    icon: "Total Users",
  },
  {
    label: "Farmers",
    stats: "650",
    progress: 50,
    color: "teal",
    icon: "Farmers",
  },
  {
    label: "Researchers",
    stats: "350",
    progress: 30,
    color: "yellow",
    icon: "Researchers",
  },
  {
    label: "Experts",
    stats: "250",
    progress: 20,
    color: "red",
    icon: "Experts",
  },
];

// Dummy user distribution data for Pie Chart (Replace later)
const userDistribution = [
  { name: "Farmers", value: 650 },
  { name: "Researchers", value: 350 },
  { name: "Experts", value: 250 },
];

// Dummy approval request trend for Bar Chart (Replace later)
const approvalTrends = [
  { month: "Jan", approvals: 20 },
  { month: "Feb", approvals: 30 },
  { month: "Mar", approvals: 45 },
  { month: "Apr", approvals: 50 },
  { month: "May", approvals: 60 },
  { month: "Jun", approvals: 80 },
];

// Colors for Pie Chart
const COLORS = ["#4caf50", "#ff9800", "#2196f3"];

const Dashboard = () => {
  // Function to handle approval request click
  const handleApprovalClick = () => {
    showNotification({
      title: "Approval Requests",
      message: "You have 45 pending approval requests.",
      icon: <IconAlertCircle />,
      color: "purple",
      autoClose: 5000,
    });
  };
  

  return (
    <Container size="xl" py="lg" className="container">
      <Title order={2} className="dashboard-title">
        Dashboard
      </Title>

      <SimpleGrid cols={4} spacing="lg" className="stats-grid">
        {statsData.map((stat) => {
          const IconComponent = icons[stat.icon];
          return (
            <Paper
              withBorder
              radius="md"
              p="md"
              className="stat-card"
              key={stat.label}
              
            >
              {/* <Group position="center">
                <RingProgress
                  size={100} // Increased size
                  roundCaps
                  thickness={8} // Slightly thicker ring
                  sections={[{ value: stat.progress, color: stat.color }]}
                  label={
                    }
                    />
                    </Group> */}
              <Center>
                <IconComponent size={40} stroke={2} color={stat.color} />
              </Center>
              <Text className="stat-label" align="center" style={{ marginTop: 10 }}>
                {stat.label}
              </Text>
              <Text className="stat-value" align="center" style={{ color: stat.color, fontSize: 18, fontWeight: "bold" }}>
                {stat.stats}
              </Text>
            </Paper>
          );
        })}
      </SimpleGrid>

      <Divider my="xl" />

      <SimpleGrid cols={2} spacing="lg" className="charts-grid">
        <Card className="chart-card">
          <Title order={3} align="center">
            User Distribution
          </Title>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userDistribution}
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {userDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="chart-card" onClick={handleApprovalClick} style={{ cursor: "pointer" }}>
          <Title order={3} align="center">
            Approval Requests
          </Title>
          <Group position="center" mt="md">
            <IconAlertCircle size={60} color="purple" /> {/* Larger icon */}
          </Group>
          <Text align="center" mt="md" style={{ fontSize: "18px", color: "purple" }}>
            Pending Approval Requests
          </Text>
          <Text align="center" style={{ fontSize: "24px", fontWeight: "bold", color: "purple" }}>
            {statsData.find((stat) => stat.label === "Approval Requests")?.stats}
          </Text>
        </Card>
      </SimpleGrid>
    </Container>
  );
};

export default Dashboard;