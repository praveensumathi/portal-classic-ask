import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import {
  ICheckOut,
  ICheckOutValidation,
  IOrder,
  IOrderShippingdetail,
  IProductDetailLocalStorage,
  IUser,
} from "../../interface/types";
import { httpWithoutCredentials } from "../../services/http";
import { useSnackBar } from "../../context/SnackBarContext";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { DrawerEnum, useDrawer } from "../../context/DrawerContext";
import OrderErrorDialog from "../../pageDialogModels/OrderErrorDialog";
import {
  LOCAL_STORAGE_DELIVERY_FEE,
  LOCAL_STORAGE_SHIPPING_DETAILS,
  CART_ITEMS_KEY,
  UserRoles,
} from "../../constants/Constants";
import { calculateDeliveryFee } from "../../common/utils/util";
import { createProductOrder } from "../../services/api";
import { useMyBag } from "../../context/MyBagContext";
import { RazorpayPaymentResponse } from "../../interface/types";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
  openRazorpayModal,
} from "../../common/utils/paymentUtils";

interface IProps {
  shippingDetail: IOrderShippingdetail;
}

function OrderSummaryPage(props: IProps) {
  const { shippingDetail } = props;

  const { updateSnackBarState } = useSnackBar();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { updateDrawerState } = useDrawer();
  const { updateMyBagCount } = useMyBag();

  const [loggedInUser, setLoggedInUser] = useState<IUser | null>(null);

  const [checkout, setCheckout] = useState<ICheckOut>({
    itemsPrice: 0,
    netWeightTotal: 0,
    orderTotal: 0,
  });
  const [checkOrderValidationErrors, setCheckOrderValidationErrors] = useState<
    ICheckOutValidation[]
  >([]);
  const [openOrderNowErrorDialog, setOpenOrderNowErrorDialog] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);

  useEffect(() => {
    fetchOrderTotalValue();
  }, []);

  useEffect(() => {
    setLoggedInUser(user);
  }, [user]);

  const openMyBagDrawer = () => {
    setOpenOrderNowErrorDialog(false);
    updateDrawerState(DrawerEnum.MyBag);
    navigate(paths.ROOT);
  };

  const fetchOrderTotalValue = async () => {
    try {
      var localStorageProductData = localStorage.getItem(CART_ITEMS_KEY);

      var localStorageProductParse = localStorageProductData
        ? JSON.parse(localStorageProductData)
        : null;

      const data: IProductDetailLocalStorage[] = localStorageProductParse ?? [];

      const userId = user?.userId;
      const response = await httpWithoutCredentials.post<ICheckOut>(
        "/myBag/checkOut",
        {
          products: data,
          userId: userId,
        }
      );
      if (response) {
        setCheckout(response.data);

        const netWeight = response.data.netWeightTotal;

        var calculatedDeliveryFee = 0;
        if (user && user.role === UserRoles.CUSTOMER) {
          calculatedDeliveryFee = calculateDeliveryFee(
            netWeight,
            shippingDetail.state
          );
          setDeliveryFee(calculatedDeliveryFee);
        }

        localStorage.setItem(
          LOCAL_STORAGE_DELIVERY_FEE,
          JSON.stringify(calculatedDeliveryFee)
        );
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
        updateSnackBarState(true, error.response.data.message, "error");
      }
      // throw error;
      console.error("Error:", error);
    }
  };

  const checkOrderNowValidation = async () => {
    try {
      var localStorageProductData = localStorage.getItem(CART_ITEMS_KEY);
      var localStorageProductParse = localStorageProductData
        ? JSON.parse(localStorageProductData)
        : null;
      const data: IProductDetailLocalStorage[] = localStorageProductParse ?? [];

      const response = await httpWithoutCredentials.post<ICheckOutValidation[]>(
        "/product/checkValidation",
        data
      );

      setCheckOrderValidationErrors(response.data);

      const hasErrors = response.data.length > 0;
      setHasErrors(hasErrors);

      if (hasErrors) {
        let a = (
          <>
            Error! click <ErrorOutlineIcon sx={{ color: "red", ml: 1 }} />
          </>
        );
        updateSnackBarState(true, a, "error");
      } else if (!hasErrors) {
        if (user && user?.role === UserRoles.CUSTOMER) {
          handleRazorpayPaymentInitiate();
        } else if (user && user?.role === UserRoles.SUPER_CUSTOMER) {
          placeOrderWithoutPayment();
        } else {
          return;
        }
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
        updateSnackBarState(true, error.response.data.message, "error");
      }
    }
  };

  //for the super customer only
  const placeOrderWithoutPayment = async () => {
    try {
      const items = localStorage.getItem(CART_ITEMS_KEY) ?? "";

      if (!shippingDetail) {
        console.log("Error shippingDetail is missing");
        return;
      }

      const data: IOrder = {
        userId: user?.userId!,
        items: items,
        shippingDetail: shippingDetail!,
        deliveryFee: 0, //for the super customer only
      };

      // console.log(data);

      await createProductOrder(data).then((res) => {
        if (res.success) {
          localStorage.removeItem(CART_ITEMS_KEY);
          updateSnackBarState(
            true,
            "Order has created successfully",
            "success"
          );

          updateMyBagCount();

          navigate(paths.ORDERSUCCESS);
        } else {
          navigate(paths.ORDERERROR);
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

  const handleOrderNowClick = () => {
    localStorage.setItem(
      LOCAL_STORAGE_SHIPPING_DETAILS,
      JSON.stringify(shippingDetail)
    );

    checkOrderNowValidation();
  };

  const handleRazorpayPaymentInitiate = async () => {
    try {
      // Create Razorpay order
      const orderData = await createRazorpayOrder(
        checkout.orderTotal + deliveryFee
      );

      // Open Razorpay payment modal
      openRazorpayModal(
        { ...orderData },
        async (response: RazorpayPaymentResponse) => {
          try {
            // Verify payment
            await verifyRazorpayPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });

            // Place order with Razorpay payment info
            await placeOrderWithRazorpay(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              orderData.amount / 100 // Convert back from paise
            );
          } catch (error: any) {
            console.error("Payment verification failed:", error);
            updateSnackBarState(true, "Payment verification failed", "error");
            navigate(paths.ORDERERROR);
          }
        },
        (response: any) => {
          console.log("Payment failed:", response);
          updateSnackBarState(true, response.error.reason, "error");
          navigate(paths.ORDERERROR);
        },
        () => {
          updateSnackBarState(true, "Payment cancelled", "info");
        }
      );
    } catch (error: any) {
      console.error("Error initiating Razorpay payment:", error);
      updateSnackBarState(true, "Error while initiating payment", "error");
    }
  };

  const placeOrderWithRazorpay = async (
    razorpayPaymentId: string,
    razorpayOrderId: string,
    paidAmount: number
  ) => {
    try {
      const items = localStorage.getItem(CART_ITEMS_KEY) ?? "";

      if (!shippingDetail) {
        console.log("Error shippingDetail is missing");
        return;
      }

      const data: IOrder = {
        userId: user?.userId!,
        items: items,
        shippingDetail: shippingDetail!,
        paymentInfo: {
          merchantId: razorpayOrderId,
          merchantTransactionId: razorpayPaymentId,
          status: "PAYMENT_SUCCESS",
          originalTransactionId: razorpayPaymentId,
        },
        deliveryFee: deliveryFee,
      };

      await createProductOrder(data).then((res) => {
        if (res.success) {
          localStorage.removeItem(CART_ITEMS_KEY);
          updateSnackBarState(
            true,
            "Order has created successfully",
            "success"
          );

          updateMyBagCount();
          navigate(paths.ORDERSUCCESS);
        } else {
          navigate(paths.ORDERERROR);
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

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {hasErrors && (
          <ErrorOutlineIcon
            sx={{
              color: "red",
            }}
            onClick={() => setOpenOrderNowErrorDialog(true)}
          />
        )}
      </Box>
      <Box
        mt={1}
        mb={2}
        sx={{
          padding: 2,
          boxShadow: 3,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography>
          <span style={{ float: "left" }}>Items Price:</span>
          <span style={{ float: "right" }}>&#8377;{checkout.itemsPrice}</span>
        </Typography>
        <Typography>
          <span style={{ float: "left" }}>Delivery:</span>
          <span style={{ float: "right" }}>&#8377;{deliveryFee}</span>
        </Typography>
        <Divider sx={{ marginTop: 1 }} />
        <Typography sx={{ fontWeight: 600 }}>
          <span style={{ float: "left" }}>Order Total:</span>
          <span style={{ float: "right" }}>
            &#8377;{checkout.orderTotal + deliveryFee}
          </span>
        </Typography>
      </Box>
      <Box my={2} sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
        <Typography sx={{ fontSize: "medium", fontWeight: "bold" }} mb={1}>
          Delivery Address
        </Typography>
        <Typography component="div" sx={{ fontSize: "small", lineHeight: 1.8 }}>
          <span style={{ fontWeight: "bold", opacity: 0.9 }}>Name:&nbsp;</span>
          {shippingDetail.customerName}
        </Typography>
        <Typography
          component="div"
          sx={{
            fontSize: "small",
            lineHeight: 1.8,
            wordWrap: "break-word",
          }}
        >
          <span
            style={{
              fontWeight: "bold",
              opacity: 0.9,
            }}
          >
            Address:&nbsp;
          </span>
          {shippingDetail.address}
        </Typography>
        <Typography component="div" sx={{ fontSize: "small", lineHeight: 1.8 }}>
          <span style={{ fontWeight: "bold", opacity: 0.9 }}>
            District:&nbsp;
          </span>
          {shippingDetail.district}
        </Typography>
        <Typography component="div" sx={{ fontSize: "small", lineHeight: 1.8 }}>
          <span style={{ fontWeight: "bold", opacity: 0.9 }}>
            PinCode:&nbsp;
          </span>
          {shippingDetail.pincode}
        </Typography>
        <Typography component="div" sx={{ fontSize: "small", lineHeight: 1.8 }}>
          <span style={{ fontWeight: "bold", opacity: 0.9 }}>State:&nbsp;</span>
          {shippingDetail.state}
        </Typography>
        <Typography component="div" sx={{ fontSize: "small", lineHeight: 1.8 }}>
          <span style={{ fontWeight: "bold", opacity: 0.9 }}>
            MobileNo:&nbsp;
          </span>
          {shippingDetail.phoneNumber}
        </Typography>
      </Box>
      <Box sx={{ bottom: 20, width: "100%" }}>
        <Button
          variant="contained"
          size="small"
          fullWidth
          onClick={handleOrderNowClick}
        >
          Order Now
        </Button>
      </Box>

      <OrderErrorDialog
        openOrderNowErrorDialog={openOrderNowErrorDialog}
        onClose={() => setOpenOrderNowErrorDialog(false)}
        checkOrderValidation={checkOrderValidationErrors}
        openMyBagDrawer={openMyBagDrawer}
      />
    </>
  );
}

export default OrderSummaryPage;
