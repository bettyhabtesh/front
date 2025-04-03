import { useState } from "react";
import { Group, Divider, Text } from "@mantine/core";
import { NavLink, useNavigate } from "react-router-dom"; 
import {
  IconBellRinging,
  IconDatabaseImport,
  IconReceipt2,
  IconLogout,
} from "@tabler/icons-react";

// Custom styles for Sidebar
import classes from "./Sidebar.module.css";

const data = [
  { link: "/dashboard", label: "Dashboard", icon: IconDatabaseImport },
  { link: "/users", label: "Users", icon: IconBellRinging },
  { link: "/approvals", label: "Approvals", icon: IconReceipt2 },
];

export function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  const navigate = useNavigate(); // Hook to handle navigation

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Remove login state
    setTimeout(() => {
      navigate("/login"); // Navigate after clearing state
    }, 100); // Small delay to ensure state is cleared before navigating
  };
  

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Text className={classes.title} size="xl" weight={700}>
            Admin Panel
          </Text>
        </Group>

        {data.map((item) => (
          <NavLink
            to={item.link}
            className={({ isActive }) =>
              `${classes.link} ${isActive ? classes.active : ""}`
            }
            key={item.label}
            onClick={() => setActive(item.label)} // ✅ Removed preventDefault()
            style={{ textDecoration: "none", color: "white" }}
          >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      <Divider my="sm" />

      <div className={classes.footer}>
        <NavLink
          to="/login"
          className={classes.link}
          onClick={handleLogout} // Trigger logout on click
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Sidebar;
