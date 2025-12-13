import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  Link,
  Container,
  FormHelperText,
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useAuthContext } from "../../context/AuthContext";
import { IUserProfile, ISignUp, IUser } from "../../interface/types";
import { getUserByUserId, updateUserProfile } from "../../services/api";
import { useSnackBar } from "../../context/SnackBarContext";
import { paths } from "../../routes/paths";
import { yupResolver } from "@hookform/resolvers/yup";
import { Resolver, useForm } from "react-hook-form";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().min(5, "Name should be at least 5 characters").required(),
  email: yup
    .string()
    .email("Invalid email format")
    .required("email is mandatory"),
});

function Profile() {
  const navigate = useNavigate();
  const { user, updateUserData } = useAuthContext();
  const { updateSnackBarState } = useSnackBar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IUserProfile>({
    resolver: yupResolver(validationSchema) as Resolver<IUserProfile, any>,
    mode: "all",
  });

  const fetchUserProfile = async () => {
    try {
      if (user && user.userId) {
        const fetchedUser = await getUserByUserId(user.userId);

        setValue("name", fetchedUser.name);
        setValue("email", fetchedUser.email);
        setValue("phoneNumber", fetchedUser.phoneNumber);
      }
    } catch (error) {
      updateSnackBarState(true, "Error while fetching user data", "error");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleProfileClose = () => {
    navigate(paths.ROOT);
  };

  const handleUpdateProfile = async (data: IUserProfile) => {
    try {
      const { name, email } = data;
      if (user && user.userId) {
        await updateUserProfile(user.userId, {
          name,
          email,
        });

        updateUserData({ ...user, name });
      }
      navigate(paths.ROOT);
      updateSnackBarState(true, "Profile updated successfully", "success");
    } catch (error) {
      updateSnackBarState(true, "Error while updating profile", "error");
    }
  };

  return (
    <Container>
      <Box display="flex" onClick={handleProfileClose}>
        <KeyboardBackspaceIcon
          sx={{ marginTop: 2, float: "left" }}
          color="primary"
        />
        <Typography color="primary" sx={{ marginTop: 2, marginLeft: 1 }}>
          Go back
        </Typography>
      </Box>
      <Box
        textAlign="center"
        sx={{
          lineHeight: 0,
        }}
      >
        <AccountCircleIcon sx={{ fontSize: "80px" }} color="primary" />
        <Typography fontWeight="bold" fontSize="20px" color="primary">
          Profile
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <Box sx={{ marginBottom: "10px" }}>
          <Typography fontWeight="bold" paddingBottom="5px">
            Name
          </Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="text"
            fullWidth
            inputProps={{
              style: { padding: "10px" },
            }}
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            FormHelperTextProps={{
              sx: { color: "red", marginLeft: "0px" },
            }}
          />
        </Box>

        <Box sx={{ marginBottom: "10px" }}>
          <Typography fontWeight="bold" paddingBottom="5px">
            PhoneNumber
          </Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="number"
            fullWidth
            inputProps={{
              style: { padding: "10px" },
            }}
            {...register("phoneNumber")}
            disabled
          />
        </Box>

        <Box sx={{ marginBottom: "15px" }}>
          <Typography fontWeight="bold" paddingBottom="5px">
            Email
          </Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="email"
            fullWidth
            inputProps={{
              style: { padding: "10px" },
            }}
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            FormHelperTextProps={{
              sx: { color: "red", marginLeft: "0px" },
            }}
          />
        </Box>
        <Box sx={{ marginTop: "50px" }}>
          <Button
            variant="outlined"
            sx={{ width: "100%", marginBottom: "10px" }}
            onClick={handleProfileClose}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            sx={{ width: "100%", marginBottom: "10px" }}
            type="submit"
          >
            Update Profile
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default Profile;
