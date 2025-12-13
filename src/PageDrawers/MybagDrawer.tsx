import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import ProductWithSizeCard from "../common/components/ProductWithSizeCard";
import { DrawerEnum, useDrawer } from "../context/DrawerContext";

function MybagDrawer() {
  const { updateDrawerState } = useDrawer();

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          padding: 2,
          height: "50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "large", fontWeight: 600 }}>
          MyBag
        </Typography>

        <CloseIcon
          onClick={() => {
            updateDrawerState(DrawerEnum.MyBag);
          }}
        />
      </Box>
      <Divider />
      <ProductWithSizeCard />
    </>
  );
}

export default MybagDrawer;
