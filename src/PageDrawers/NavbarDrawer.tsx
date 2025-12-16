import React from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { NavLink as NavLinkBase } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import InfoIcon from "@mui/icons-material/Info";
import { paths } from "../routes/paths";
import { DrawerEnum, useDrawer } from "../context/DrawerContext";
import { useNavbarStyle } from "../styles/NavbarStyle";
import { useAuthContext } from "../context/AuthContext";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";

function NavbarDrawer() {
  const classes = useNavbarStyle();
  const { updateDrawerState } = useDrawer();
  const { user } = useAuthContext();

  const NavLink = React.forwardRef(
    (props: any, ref: React.Ref<HTMLAnchorElement> | undefined) => (
      <NavLinkBase
        style={{
          textDecoration: "none",
        }}
        ref={ref}
        {...props}
        className={props.activeclassname ?? ""}
      />
    )
  );

  const navItems = [
    {
      label: " Home",
      link: paths.ROOT,
      icon: <HomeIcon color="primary" />,
    },
    {
      label: "Orders",
      link: paths.ORDERS,
      icon: <AddShoppingCartIcon color="primary" />,
    },
    {
      label: "Terms & Support",
      link: paths.PRIVACYPOLICY,
      icon: <PrivacyTipIcon color="primary" />,
    },
  ];

  return (
    <Box
      sx={{ textAlign: "start", height: "100%" }}
      onClick={() => updateDrawerState(DrawerEnum.Navbar)}
    >
      <Box
        p={2}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          backgroundColor: "#ece7ee",
        }}
      >
        <Typography color="primary" sx={{ fontWeight: 600 }} fontSize={"large"}>
          {import.meta.env.VITE_SHOP_NAME}
        </Typography>
        <ArrowBackIosIcon
          sx={{ fontSize: "large", cursor: "pointer" }}
          color="primary"
        />
      </Box>
      <Divider />

      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.label}
            disablePadding
            component={NavLink}
            to={item.link}
            activeclassname={({ isActive }) =>
              isActive ? classes.activeLink : ""
            }
            sx={{ justifyContent: "center" }}
          >
            <ListItemButton sx={{ borderRadius: "0 10px 10px 0" }}>
              <Box display={"flex"} alignItems={"center"}>
                {item.icon}
                <ListItemText
                  sx={{
                    textAlign: "start",
                    marginLeft: "8px",
                    color: "primary.main",
                  }}
                  primary={item.label.trim()}
                />
              </Box>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          position: "absolute",
          bottom: "12px",
          left: 0,
          right: 0,
          opacity: 0.5,
        }}
      >
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          &copy; {new Date().getFullYear()} Classic-ASK
        </Typography>
        <Typography>All rights reserved.</Typography>
      </Box>
    </Box>
  );
}

export default NavbarDrawer;
