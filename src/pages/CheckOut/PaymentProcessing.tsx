import React, { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CircularProgress from "@mui/material/CircularProgress";
import { purple } from "@mui/material/colors";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LinearProgress from "@mui/material/LinearProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useMyBag } from "../../context/MyBagContext";
import { useAuthContext } from "../../context/AuthContext";
import { useSnackBar } from "../../context/SnackBarContext";
import { paths } from "../../routes/paths";
import {
  LOCAL_STORAGE_DELIVERY_FEE,
  LOCAL_STORAGE_PAYMENT_RESPONSE,
  LOCAL_STORAGE_SHIPPING_DETAILS,
  CART_ITEMS_KEY,
} from "../../constants/Constants";
import {
  PhonePePaymentInitiateResponse,
  PhonePePaymentStatucCheckResponse,
} from "../../interface/phonepe.types";
import { httpWithoutCredentials } from "../../services/http";
import { IOrder, IOrderShippingdetail } from "../../interface/types";
import { createProductOrder } from "../../services/api";
import { useParams } from "react-router-dom";

export default function PaymentProcessing() {
  let params = useParams();

  const navigate = useNavigate();
  const { updateMyBagCount } = useMyBag();
  const { user } = useAuthContext();
  const { updateSnackBarState } = useSnackBar();

  const [isPaymentIsInProgress, setIsPaymentIsInProgress] = useState(false);
  const [paymentInitiateResponse, setPaymentInitiateResponse] =
    useState<PhonePePaymentInitiateResponse>();
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [shippingDetail, setShippingDetail] = useState<IOrderShippingdetail>();

  let intervalId: any;

  // const PAYMENT_INITIATED = "PAYMENT_INITIATED";
  // const PAYMENT_SUCCESS = "PAYMENT_SUCCESS";
  // const PAYMENT_DECLINED = "PAYMENT_DECLINED";
  // const PAYMENT_ERROR = "PAYMENT_ERROR";
  // const TIMED_OUT = "TIMED_OUT";

  // useEffect(() => {
  //   if (isPaymentIsInProgress) {
  //     intervalId = setInterval(chcekPaymentStatus, 4000);
  //   }

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [isPaymentIsInProgress]);

  useEffect(() => {
    const stringifyPaymentInitiateResponse = localStorage.getItem(
      LOCAL_STORAGE_PAYMENT_RESPONSE
    );
    const paymentInitiateResponse: PhonePePaymentInitiateResponse =
      stringifyPaymentInitiateResponse
        ? JSON.parse(stringifyPaymentInitiateResponse)
        : null;

    setPaymentInitiateResponse({ ...paymentInitiateResponse });

    const stringifyDeliveryFee = localStorage.getItem(
      LOCAL_STORAGE_DELIVERY_FEE
    );
    const _deliveryFee: number = stringifyDeliveryFee
      ? JSON.parse(stringifyDeliveryFee)
      : 0;

    setDeliveryFee(_deliveryFee);

    const stringifyShippingDetails = localStorage.getItem(
      LOCAL_STORAGE_SHIPPING_DETAILS
    );
    const shippingDetail: IOrderShippingdetail = stringifyShippingDetails
      ? JSON.parse(stringifyShippingDetails)
      : null;

    setShippingDetail(shippingDetail);

    // setTimeout(() => {
    setIsPaymentIsInProgress(true);
    // }, 1000);

    return () => {
      localStorage.removeItem(LOCAL_STORAGE_PAYMENT_RESPONSE);
      localStorage.removeItem(LOCAL_STORAGE_SHIPPING_DETAILS);
      localStorage.removeItem(LOCAL_STORAGE_DELIVERY_FEE);
    };
  }, []);

  // const chcekPaymentStatus = async () => {
  //   try {
  //     if (
  //       // paymentInitiateResponse &&
  //       // paymentInitiateResponse.code == PAYMENT_INITIATED
  //       true
  //     ) {
  //       const response =
  //         await httpWithoutCredentials.post<PhonePePaymentStatucCheckResponse>(
  //           `/payment/phonePeStatusCheck/${params.mId}/${params.mTxId}`
  //         );

  //       const paymentStatusResponse = response.data;

  //       if (paymentStatusResponse) {
  //         if (
  //           paymentStatusResponse.code == PAYMENT_SUCCESS &&
  //           paymentStatusResponse.success
  //         ) {
  //           clearInterval(intervalId);
  //           placeOrder(paymentStatusResponse);
  //         }

  //         if (
  //           paymentStatusResponse.code == PAYMENT_DECLINED ||
  //           paymentStatusResponse.code == PAYMENT_ERROR ||
  //           paymentStatusResponse.code == TIMED_OUT
  //         ) {
  //           clearInterval(intervalId);
  //           updateSnackBarState(true, "Error while create order", "error");
  //           navigate(paths.ORDERERROR);
  //         }
  //       }
  //     }
  //   } catch (error: any) {
  //     clearInterval(intervalId);
  //     updateSnackBarState(true, "Error while create order", "error");
  //     navigate(paths.ORDERERROR);
  //   }
  // };

  const placeOrder = async (
    paymentStatusResponse: PhonePePaymentStatucCheckResponse
  ) => {
    try {
      const items = localStorage.getItem(CART_ITEMS_KEY) ?? "";

      if (!shippingDetail || !paymentInitiateResponse) {
        console.log(
          "Error shippingDetail or paymentInitiateResponse is missing in the local storage"
        );

        return;
      }

      const data: IOrder = {
        userId: user?.userId!,
        items: items,
        shippingDetail: shippingDetail!,
        paymentInfo: {
          merchantId: paymentStatusResponse?.data.merchantId!,
          merchantTransactionId:
            paymentStatusResponse?.data.merchantTransactionId!,
          status: paymentStatusResponse.code,
          originalTransactionId: paymentStatusResponse.data.transactionId,
        },
        deliveryFee: deliveryFee,
      };

      await createProductOrder(data).then((res) => {
        if (res.success) {
          afterOrderCreated();
        } else {
          clearInterval(intervalId);
          navigate(paths.ORDERERROR);
          setIsPaymentIsInProgress(false);
        }
      });
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
        updateSnackBarState(true, error.response.data.message, "error");
        navigate(paths.ORDERERROR);
      }
    }
  };

  const afterOrderCreated = () => {
    setIsPaymentIsInProgress(false);

    clearInterval(intervalId);

    localStorage.removeItem(CART_ITEMS_KEY);
    updateMyBagCount();
    updateSnackBarState(true, "Order has created successfully", "success");

    navigate(paths.ORDERSUCCESS);
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <Grid container>
        <Grid item xs={3} justifyContent={"center"} display={"flex"}>
          <Box
            sx={{
              m: 1,
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Fab aria-label="save" color="primary">
              <AccountBalanceIcon />
            </Fab>

            <CircularProgress
              size={68}
              sx={{
                color: purple[100],
                position: "absolute",
                top: -6,
                left: -6,
                zIndex: 1,
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={6} alignItems={"center"} display={"flex"}>
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        </Grid>
        <Grid item xs={3} justifyContent={"center"} display={"flex"}>
          <Box
            sx={{
              m: 1,
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Fab aria-label="save" color="primary">
              <PhoneAndroidIcon />
            </Fab>

            <CircularProgress
              size={68}
              sx={{
                color: purple[100],
                position: "absolute",
                top: -6,
                left: -6,
                zIndex: 1,
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box textAlign={"center"} mt={2}>
            <Typography
              variant="h6"
              gutterBottom
              fontWeight={"bold"}
              sx={{ opacity: 0.9 }}
            >
              Payment In Progress
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              fontWeight={"bold"}
              sx={{ opacity: 0.7 }}
            >
              Please wait do not refresh the page, <br />
              We will automatically redirect you once the payment process is
              completed.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
