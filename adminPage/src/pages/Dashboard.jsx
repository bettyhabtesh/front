import { Container, Title, Text, Paper, RingProgress, SimpleGrid, Center, Group, Card, Divider } from "@mantine/core";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import "../App.css";

// Icons for stats
const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
};

// Dummy stats (Replace with actual data from API or state)
const statsData = [
  { label: "Total Users", stats: "1,250", progress: 70, color: "blue", icon: "up" },
  { label: "Farmers", stats: "650", progress: 50, color: "teal", icon: "up" },
  { label: "Researchers", stats: "350", progress: 30, color: "yellow", icon: "up" },
  { label: "Experts", stats: "250", progress: 20, color: "red", icon: "down" },
  { label: "Approval Requests", stats: "45", progress: 85, color: "purple", icon: "up" },
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
  return (
    <Container size="xl" py="lg" className="container">
  <Title order={2} className="dashboard-title">
    Dashboard
  </Title>

  <SimpleGrid cols={5} spacing="lg" className="stats-grid">
    {statsData.map((stat) => {
      const Icon = icons[stat.icon];
      return (
        <Paper withBorder radius="md" p="md" className="stat-card" key={stat.label}>
          <Group position="center">
           <RingProgress
  size={80}  // Reduced from 100 to 80
  roundCaps
  thickness={6} // Thinner ring
  sections={[{ value: stat.progress, color: stat.color }]}
  label={
    <Center>
      <Icon size={20} stroke={1.5} color={stat.color} />
    </Center>
  }
/>
          </Group>
          <Text className="stat-label">{stat.label}</Text>
          <Text className="stat-value" style={{ color: stat.color }}>
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
          <Pie data={userDistribution} cx="50%" cy="50%" outerRadius={120} label>
            {userDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>

    <Card className="chart-card">
      <Title order={3} align="center">
        Approval Requests Trend
      </Title>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={approvalTrends}>
          <XAxis dataKey="month" stroke="#333" />
          <YAxis stroke="#333" />
          <Tooltip />
          <Legend />
          <Bar dataKey="approvals" fill="#8884d8" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  </SimpleGrid>
</Container>

  );
};

export default Dashboard;
