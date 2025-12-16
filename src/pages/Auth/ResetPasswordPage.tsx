import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { resetPassword } from "../../services/api";
import { useSnackBar } from "../../context/SnackBarContext";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";

const ResetPasswordPage = () => {
  const location = useLocation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { updateSnackBarState } = useSnackBar();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const phoneNumber = urlParams.get("phoneNumber");
    const token = urlParams.get("token");

    if (phoneNumber && token) {
      setPhoneNumber(phoneNumber);
      setToken(token);
    }
  }, [location]);

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      updateSnackBarState(true, "passwords do not match", "error");
      return;
    }

    try {
      if (phoneNumber && token) {
        await resetPassword(Number(phoneNumber), token, newPassword);
        updateSnackBarState(true, "Password reset successfully", "success");
        navigate(paths.ROOT);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error: any) {
      console.error("Error generating reset link:", error);
      if (error && error.response) {
        updateSnackBarState(true, error.response.data.message, "error");
      }
    }
  };

  return (
    <>
      <AppBar>
        <Toolbar>
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
                  width: "45px",
                  borderRadius: "50%",
                }}
                src="assets\images\Logo2.jpg"
                alt=""
              />
            </Link>
            <Typography sx={{ fontWeight: 600 }}>
              {import.meta.env.VITE_SHOP_BRAND_NAME}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <form onSubmit={handleUpdatePassword}>
          <Typography variant="h5" align="center" gutterBottom>
            Reset Password
          </Typography>
          <TextField
            id="new-password-input"
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            autoComplete="new"
          />
          <TextField
            id="outlined-password-input"
            margin="normal"
            fullWidth
            label="Confirm new password"
            type="password"
            autoComplete="new"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Reset Password
          </Button>
        </form>
      </Container>
    </>
  );
};

export default ResetPasswordPage;
