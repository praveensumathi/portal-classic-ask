import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";

function Layout() {
  return (
    <Box>
      <Navbar></Navbar>
      <Box
        sx={{
          marginTop: "1px",
        }}
        mb={2}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
