import { Box, Button, Container, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";
import Bounce from "react-reveal/Bounce";
import { useEffect } from "react";

function OrderSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate(paths.ROOT);
    }, 3000);

    return () => {
      clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          height: "300px",
          width: "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            marginTop: 2,
          }}
        >
          <Bounce>
            <CheckCircleIcon
              sx={{ fontSize: 100, color: "primary.main", py: 2 }}
            />
          </Bounce>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6">Thank You For Ordering</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            py: 5,
            "@media (max-width: 600px)": {
              flexDirection: "column",
            },
          }}
        >
          <Link to={`/${paths.ORDERS}`}>
            <Button variant="outlined" sx={{ alignItems: "center" }}>
              VIEW ORDER
            </Button>
          </Link>
          <Link to={paths.ROOT}>
            <Button variant="contained">CONTINUE SHOPPING</Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default OrderSuccessPage;
