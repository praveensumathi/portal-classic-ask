import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ChatIcon from "@mui/icons-material/Chat";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";
import Bounce from "react-reveal/Bounce";
import { useEffect } from "react";

function OrderErrorPage() {
  const navigate = useNavigate();
  const whatsappUrl = import.meta.env?.VITE_WHATSAPP_URL ?? "https://wa.me/";

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
        height: "80vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 640,
          mx: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          py: 6,
        }}
      >
        <Box
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 3,
            p: { xs: 3, md: 6 },
            textAlign: "center",
          }}
        >
          <Bounce>
            <Box
              sx={(theme) => ({
                width: { xs: 48, sm: 64, md: 88 },
                height: { xs: 48, sm: 64, md: 88 },
                mx: "auto",
                borderRadius: "50%",
                bgcolor: theme.palette.error.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 4,
                mb: 1,
                transform: "translateY(0)",
                animation: "popIn 0.45s ease-out",
              })}
            >
              <CancelIcon
                sx={{ fontSize: { xs: 20, sm: 28, md: 40 }, color: "#fff" }}
              />
            </Box>
          </Bounce>

          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            Payment Failed
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
            We couldn’t process your payment. If the amount was debited it will
            be refunded within 2-3 working days. Please try again or contact
            support if the issue persists.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link to={`/${paths.ORDERS}`}>
              <Button variant="outlined">View Orders</Button>
            </Link>

            <Button
              variant="contained"
              color="success"
              startIcon={<ChatIcon />}
              component="a"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with support"
            >
              Chat with Support
            </Button>
          </Box>
        </Box>
      </Box>

      <style>{`
        @keyframes popIn { 0% { transform: scale(0.6); opacity: 0 } 60% { transform: scale(1.05); opacity: 1 } 100% { transform: scale(1) } }
      `}</style>
    </Container>
  );
}

export default OrderErrorPage;
