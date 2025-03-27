import { useState } from "react";
import { Group, Divider, Text } from "@mantine/core";
import { NavLink } from "react-router-dom"; // ✅ Use NavLink instead of Link
import {
  IconBellRinging,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
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
        <NavLink to="#" className={classes.link}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </NavLink>

        <NavLink to="#" className={classes.link}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Sidebar;
