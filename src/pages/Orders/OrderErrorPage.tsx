import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";
import Bounce from "react-reveal/Bounce";
import { useEffect } from "react";

function OrderErrorPage() {
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
            <CancelIcon sx={{ fontSize: 100, color: "primary.main", py: 2 }} />
          </Bounce>
        </Box>

        <Box sx={{ textAlign: "center", padding: "10px" }}>
          <Typography variant="h6">
            your order has not placed if money has debited from your account.It
            will refunded within 2-3 working days
          </Typography>
        </Box>
        <Box
          sx={{
            marginBottom: "20px",
          }}
        >
          <Link to={paths.ROOT}>
            <Button variant="contained">Go Back</Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default OrderErrorPage;
