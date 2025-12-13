import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DrawerEnum, useDrawer } from "../../context/DrawerContext";
import { paths } from "../../routes/paths";

function NoProductInSizeCard() {
  const navigate = useNavigate();

  const { drawerState, updateDrawerState } = useDrawer();

  const moveToHome = () => {
    navigate(paths.ROOT);
    updateDrawerState(DrawerEnum.MyBag);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            paddingTop: "100px",
          }}
        >
          <ProductionQuantityLimitsIcon
            sx={{ fontSize: "7rem", opacity: 0.5 }}
          ></ProductionQuantityLimitsIcon>
          <h2>YOUR BAG IS EMPTY</h2>
        </Box>
        <Box>
          <Box>
            <Typography sx={{ fontSize: "small", textAlign: "center" }}>
              Before Proceed to checkout you must add some
              <br />
              products to Your shopping Cart.
              <br />
              You will find a lot of interesting products on our
              <br />
              "Shop" page.
            </Typography>
          </Box>
          <Box sx={{ padding: "20px" }}>
            <Button variant="contained" fullWidth onClick={moveToHome}>
              Return to Shop
              <ArrowRightAltIcon />
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default NoProductInSizeCard;
