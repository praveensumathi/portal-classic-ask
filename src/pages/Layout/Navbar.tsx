import React, { useEffect, useState } from "react";
import { useNavbarStyle } from "../../styles/NavbarStyle";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import {
  FullScreenDrawerWidth,
  NavBarDrawerWidthDesktop,
  NavBarDrawerWidthMobile,
  NKS_ITEMS,
} from "../../constants/Constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { paths } from "../../routes/paths";
import { DrawerEnum, useDrawer } from "../../context/DrawerContext";
import { useMyBag } from "../../context/MyBagContext";
import SearchProductDrawer from "../../PageDrawers/SearchProductDrawer";
import NavbarDrawer from "../../PageDrawers/NavbarDrawer";
import MybagDrawer from "../../PageDrawers/MybagDrawer";
import Logout from "@mui/icons-material/Logout";
import { useAuthContext } from "../../context/AuthContext";
import { IUser } from "../../interface/types";
import { isAuthorized, logOut } from "../../services/api";
import { useSnackBar } from "../../context/SnackBarContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    fontWeight: 800,
  },
}));

function Navbar() {
  const location = useLocation();

  const isCheckoutPage = location.pathname.includes(paths.CHECKOUT);
  const isPaymentProcessing = location.pathname.includes(
    paths.PAYMENT_PROCESSING
  );

  const { mybagCount } = useMyBag();
  const classes = useNavbarStyle();
  const { drawerState, updateDrawerState } = useDrawer();
  const { user, updateUserData } = useAuthContext();

  const navigate = useNavigate();
  const { updateSnackBarState } = useSnackBar();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuClick = () => {
    navigate(paths.PROFILE);
    handleCloseMenu();
  };

  const checkIsAuthorized = async () => {
    await isAuthorized()
      .then((data) => {
        if (data) {
          updateUserData(data);
        } else {
          updateUserData(null);
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.log(error.response.data);
          updateSnackBarState(true, error.response.data.message, "error");
        }
      });
  };

  const handleLogoutClick = async () => {
    await logOut()
      .then((response) => {
        if (response.status) {
          localStorage.removeItem(NKS_ITEMS);
          updateUserData(null);
          navigate(paths.ROOT);
          handleCloseMenu();
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.log(error.response.data);
          updateSnackBarState(true, error.response.data.message, "error");
        }
      });
  };

  useEffect(() => {
    checkIsAuthorized();
  }, []);

  const moveToLogin = () => {
    navigate(`/${paths.LOGIN}`, { state: { fromNavbar: true } });
  };

  return (
    <>
      {/* Navbars */}
      <Box display={"flex"} flexGrow={1} className={classes.root}>
        <AppBar component="nav">
          <Toolbar>
            {!isPaymentProcessing && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={() => updateDrawerState(DrawerEnum.Navbar)}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexGrow: 0,
              }}
            >
              <Link
                to={paths.ROOT}
                style={{ textDecoration: "none", display: "flex" }}
              >
                <img
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                  }}
                  src="assets\images\Logo2.jpg"
                  alt=""
                />
              </Link>
              <Typography sx={{ fontWeight: 600 }}>Venus Ethnic</Typography>
            </Box>
            <Stack
              flexDirection={"row"}
              flexGrow={1}
              alignItems={"center"}
              justifyContent={"flex-end"}
              gap={2}
              sx={{
                cursor: "pointer",
              }}
            >
              {!isPaymentProcessing && (
                <SearchIcon
                  sx={{
                    mr: -0.5,
                  }}
                  onClick={() => {
                    updateDrawerState(DrawerEnum.Search);
                  }}
                ></SearchIcon>
              )}

              {!isCheckoutPage && !isPaymentProcessing && (
                <StyledBadge
                  color="secondary"
                  badgeContent={mybagCount}
                  sx={{
                    mr: 0.5,
                  }}
                  onClick={() => {
                    updateDrawerState(DrawerEnum.MyBag);
                  }}
                >
                  <ShoppingBagRoundedIcon />
                </StyledBadge>
              )}
              {user
                ? null
                : !isPaymentProcessing && (
                    <AccountCircleIcon onClick={moveToLogin} />
                  )}
              {user && (
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleMenuClick}
                    size="small"
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 28, height: 28 }}>
                      {user?.name ? user?.name.toUpperCase()[0] : ""}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </Box>
      {/* Drawers */}
      <Box component="nav">
        {/* Navbar drawer */}
        <Drawer
          variant="temporary"
          open={drawerState.isNaveBarDraweOpen}
          onClose={() => updateDrawerState(DrawerEnum.Navbar)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: isSmallScreen
                ? NavBarDrawerWidthMobile
                : NavBarDrawerWidthDesktop,
            },
          }}
        >
          <NavbarDrawer />
        </Drawer>
        {/* Search Drawer */}
        <Drawer
          anchor="right"
          open={drawerState.isSearchDraweOpen}
          onClose={() => updateDrawerState(DrawerEnum.Search)}
          sx={{
            position: "relative",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: FullScreenDrawerWidth,
            },
          }}
        >
          {drawerState.isSearchDraweOpen && <SearchProductDrawer />}
        </Drawer>
        {/* my Bag Drawer */}
        <Drawer
          anchor="right"
          open={drawerState.isMyBagDrawerOpen}
          onClose={() => updateDrawerState(DrawerEnum.MyBag)}
          sx={{
            position: "relative",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "100vw",
            },
          }}
        >
          {drawerState.isMyBagDrawerOpen && <MybagDrawer />}
        </Drawer>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleCloseMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            "& .MuiAvatar-root": {
              width: 25,
              height: 25,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleProfileMenuClick}>
          <Avatar />
          Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogoutClick}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
export default Navbar;
