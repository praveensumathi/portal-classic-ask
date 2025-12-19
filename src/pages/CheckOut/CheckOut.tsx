import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Login from "../../common/components/Login";
import OrderSummaryPage from "../OrderSummary/OrderSummaryPage";
import Container from "@mui/material/Container";
import { Grid, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";
import { DrawerEnum, useDrawer } from "../../context/DrawerContext";
import Signup from "../../common/components/Signup";
import BackConformationDialog from "../../pageDialogModels/BackConformationDialog";
import { useAuthContext } from "../../context/AuthContext";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import PhoneIcon from "@mui/icons-material/Phone";
import { isAuthorized } from "../../services/api";
import ShippingAddress from "./ShippingAddress";
import { useSnackBar } from "../../context/SnackBarContext";
import { useMyBag } from "../../context/MyBagContext";
import theme from "../../theme/theme";

export default function VerticalLinearStepper() {
  const navigate = useNavigate();
  const { updateMyBagCount } = useMyBag();
  const { updateDrawerState } = useDrawer();
  const { user, updateUserData } = useAuthContext();

  const [activeStep, setActiveStep] = useState(-1);
  const [completed, setCompleted] = useState({});
  const [renderRegister, setRenderRegister] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { updateSnackBarState } = useSnackBar();

  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [district, setDistrict] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [customerName, setCustomerName] = useState(""); //Address Customer name

  useEffect(() => {
    checkIsAuthorized();
  }, []);

  const handleArrowBackClick = () => {
    setShowConfirmationDialog(true);
  };

  const handleConfirmation = () => {
    navigate(paths.ROOT);
    updateDrawerState(DrawerEnum.MyBag);
    setShowConfirmationDialog(false);
  };

  const handleCancellation = () => {
    setShowConfirmationDialog(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const steps = [
    renderRegister ? "Register" : "Login",
    "Shipping Address",
    "Order Now",
  ];

  const checkIsAuthorized = async () => {
    setIsLoading(true);
    await isAuthorized()
      .then((data) => {
        if (data) {
          updateUserData(data);
          setActiveStep(1);
          setIsLoading(false);
        } else {
          updateUserData(null);
          setActiveStep(0);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.log(error.response.data);
          updateSnackBarState(true, error.response.data.message, "error");
        }
      });
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return renderRegister ? (
          <Signup
            onSign={handleNext}
            onRegisterLinkClick={() => {
              setRenderRegister((preState) => !preState);
              setActiveStep(0);
            }}
          />
        ) : (
          <Login
            onLogin={handleNext}
            onRegisterLinkClick={() => {
              setRenderRegister((preState) => !preState);
              setActiveStep(0);
            }}
          />
        );
      case 1:
        return (
          <ShippingAddress
            onNext={(
              address,
              phoneNumber,
              pincode,
              district,
              selectedState,
              name
            ) => {
              setAddress(address);
              setPhoneNumber(phoneNumber);
              setPincode(pincode);
              setDistrict(district);
              setShippingState(selectedState);
              setCustomerName(name);
              handleNext(); // Proceed to the next step
            }}
          />
        );
      case 2:
        return (
          <OrderSummaryPage
            shippingDetail={{
              address,
              pincode,
              district,
              state: shippingState,
              phoneNumber,
              customerName: customerName,
            }}
          />
        );
      default:
        return null;
    }
  };

  function stringAvatar(name: string) {
    return {
      children: (
        <Box display={"flex"} alignItems={"center"}>
          {name.split(" ")[0][0]}
        </Box>
      ),
    };
  }

  return (
    <>
      {!isLoading && (
        <>
          <Container>
            <Grid container>
              <Grid
                item
                container
                xs={12}
                md={8}
                textAlign={"center"}
                my={1}
                display={"flex"}
                alignItems={"center"}
              >
                <Grid item xs={1}>
                  <IconButton
                    sx={{
                      paddingLeft: 0,
                    }}
                    onClick={handleArrowBackClick}
                  >
                    <ArrowBackIcon color="primary" />
                  </IconButton>
                </Grid>
                <Grid item xs={10}>
                  <Typography
                    fontWeight={600}
                    fontSize={"medium"}
                    color={"primary"}
                  >
                    Place your order
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} md={8}>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                      <StepLabel
                        sx={{
                          "& .Mui-active": {
                            fontWeight: "800 !important",
                          },
                          "& .Mui-completed": {
                            color: `${theme.palette.primary.main} !important`,
                            fontWeight: "800 !important",
                          },
                        }}
                      >
                        {user && index === 0 ? (
                          <Box display={"flex"} alignItems={"center"}>
                            <Box mr={2}>{label}</Box>
                            <Chip
                              size="small"
                              avatar={
                                <Avatar {...stringAvatar(user?.name ?? "")} />
                              }
                              label={user?.name ? user?.name.slice(0, 15) : ""}
                            />
                            -
                            <Chip
                              size="small"
                              icon={<PhoneIcon />}
                              label={user?.phoneNumber}
                            />
                          </Box>
                        ) : (
                          label
                        )}
                      </StepLabel>
                      <StepContent>
                        {renderStepContent(activeStep)}
                        <Box sx={{ mb: 2 }}>
                          {activeStep == 2 && (
                            <Button
                              onClick={handleBack}
                              sx={{ mt: 1 }}
                              fullWidth
                              variant="outlined"
                            >
                              Go Back
                            </Button>
                          )}
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </Grid>
            </Grid>
          </Container>
          <BackConformationDialog
            open={showConfirmationDialog}
            onConfirm={handleConfirmation}
            onCancel={handleCancellation}
          />
        </>
      )}
    </>
  );
}
