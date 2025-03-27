import { Container, Title, Text, Paper, RingProgress, SimpleGrid, Center, Group, Card, Divider } from "@mantine/core";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";

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
    <Container size="xl" py="lg">
      <Title order={2} mb="md" align="center" style={{ color: "#333", fontWeight: 600 }}>
        Dashboard
      </Title>

      {/* Stats Rings */}
      <SimpleGrid
        cols={5}  // Horizontal layout for stats (5 stats, adjust number as needed)
        spacing="lg"
        mb="xl"
        style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}
      >
        {statsData.map((stat) => {
          const Icon = icons[stat.icon];
          return (
            <Paper
              withBorder
              radius="md"
              p="md"
              shadow="sm"
              key={stat.label}
              style={{
                textAlign: "center",
                width: "100%", // Ensures each stat card takes full width
                maxWidth: "200px",  // Limit the max width of each stat box
              }}
            >
              <Group position="center">
                <RingProgress
                  size={100}
                  roundCaps
                  thickness={8}
                  sections={[{ value: stat.progress, color: stat.color }]}
                  label={
                    <Center>
                      <Icon size={22} stroke={1.5} color={stat.color} />
                    </Center>
                  }
                />
              </Group>
              <Text size="sm" color="dimmed" tt="uppercase" fw={700} mt="md">
                {stat.label}
              </Text>
              <Text fw={700} size="xl" style={{ color: stat.color }}>
                {stat.stats}
              </Text>
            </Paper>
          );
        })}
      </SimpleGrid>

      <Divider my="xl" />

      {/* User Distribution Pie Chart and Approval Request Trends */}
      <SimpleGrid cols={2} spacing="lg" mb="lg" style={{ display: "flex", alignItems: "flex-start" }}>
        {/* Pie Chart */}
        <Card shadow="md" radius="md" p="md" style={{ backgroundColor: "#f9f9f9", width: "100%" }}>
          <Title order={3} align="center" mb="md" style={{ color: "#444" }}>
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

        {/* Bar Chart */}
        <Card shadow="md" radius="md" p="md" style={{ backgroundColor: "#f9f9f9", width: "100%" }}>
          <Title order={3} align="center" mb="md" style={{ color: "#444" }}>
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
