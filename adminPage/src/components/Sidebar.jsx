/** @format */

import { useState, useEffect } from "react";
import { Group, Divider, Text } from "@mantine/core";
import { NavLink, useNavigate } from "react-router-dom";
import {
  IconBellRinging,
  IconDatabaseImport,
  IconReceipt2,
  IconLogout,
} from "@tabler/icons-react";
import { setAuthToken } from "../services/authService";
import classes from "./Sidebar.module.css";

const data = [
  { link: "/dashboard", label: "Dashboard", icon: IconDatabaseImport },
  { link: "/users", label: "Users", icon: IconBellRinging },
  { link: "/approvals", label: "Approvals", icon: IconReceipt2 },
];

export function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear all localStorage entries
    setAuthToken(null); // Remove token from axios
    navigate("/login"); // Redirect immediately
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
            onClick={() => setActive(item.label)}
            style={{ textDecoration: "none", color: "white" }}
          >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      <Divider my="sm" />

      <div className={classes.footer}>
        <button
          className={classes.link}
          onClick={handleLogout}
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
          }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}

export default Sidebar;
