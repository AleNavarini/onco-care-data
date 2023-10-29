import * as React from "react";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import List from "@mui/joy/List";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemButton from "@mui/joy/ListItemButton";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import {
  Activity,
  BarChart,
  Bell,
  LogOut,
  Settings,
  ShoppingCart,
  Star,
  User,
} from "react-feather";
import { Tooltip } from "@mui/joy";
import { usePathname } from "next/navigation";
import { ListItemAvatar, ListItemSecondaryAction } from "@mui/material";
import { closeSidebar } from "@/utils";

const routes = [
  { icon: <Activity size={20} />, title: "Activity", href: "/activity" },
  { icon: <BarChart size={20} />, title: "Analytics", href: "/analytics" },
  {
    icon: <Bell size={20} />,
    title: "Notifications",
    href: "/notifications",
    other: (
      <Chip variant="soft" size="sm">
        10
      </Chip>
    ),
  },
  { icon: <Star size={20} />, title: "Saved reports", href: "/favorites" },
  {
    icon: <Settings size={20} />,
    title: "Manage notifications",
    href: "/settings",
  },
  { icon: <ShoppingCart size={20} />, title: "Orders", href: "/orders" },

  { icon: <User size={20} />, title: "User reports", href: "/profile" },
];

export default function SecondSidebar() {
  const pathname = usePathname();

  return (
    <React.Fragment>
      <Box
        className="SecondSidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          width: "100vw",
          height: "100vh",
          bgcolor: "red",
          opacity: "calc(var(--SideNavigation-slideIn, 0) - 0.2)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--FirstSidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={closeSidebar}
      />
      <Sheet
        className="SecondSidebar"
        sx={{
          position: {
            xs: "fixed",
            lg: "sticky",
          },
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--FirstSidebar-width, 0px)))",
            lg: "none",
          },
          borderRight: "1px solid",
          borderColor: "divider",
          transition: "transform 0.4s",
          zIndex: 9999,
          height: "100dvh",
          top: 0,
          p: 2,
          py: 3,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <List
          sx={{
            "--List-item-radius": "8px",
            "--List-item-minHeight": "32px",
            "--List-gap": "4px",
          }}
        >
          <ListSubheader role="presentation" sx={{ color: "text.primary" }}>
            Dashboard
          </ListSubheader>
          {routes.map((route, index) => (
            <ListItem key={index}>
              <Tooltip title={route.title} placement="right">
                <ListItemButton
                  selected={route.href === pathname}
                  variant={route.href === pathname ? "solid" : "plain"}
                  sx={{
                    borderRadius: "8px",
                  }}
                  onClick={closeSidebar}
                >
                  <ListItemDecorator>{route.icon}</ListItemDecorator>
                  <ListItemContent>{route.title}</ListItemContent>
                  <ListItemSecondaryAction>
                    {route.other}
                  </ListItemSecondaryAction>
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>


      </Sheet>
    </React.Fragment>
  );
}
