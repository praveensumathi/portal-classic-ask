import { httpWithoutCredentials } from "../../services/http";
import {
  RazorpayOrderResponse,
  RazorpayPaymentResponse,
  RazorpayVerifyRequest,
} from "../../interface/types";

// Define a response model for type safety
type RazorpayOrderApiResponse = {
  success: boolean;
  data: {
    orderId: string;
    amount: number;
    currency: string;
    receipt: string;
    key: string;
  };
  message: string;
};

export const createRazorpayOrder = async (
  amount: number
): Promise<RazorpayOrderResponse> => {
  try {
    const response =
      await httpWithoutCredentials.post<RazorpayOrderApiResponse>(
        "/payment/createRazorpayOrder",
        {
          amount: Math.round(amount * 100), // Convert to paise
        }
      );
    const data = response.data.data;
    console.log("Razorpay order response:", data);
    return data;
  } catch (error) {
    throw new Error("Failed to create Razorpay order");
  }
};

export const verifyRazorpayPayment = async (
  paymentData: RazorpayVerifyRequest
): Promise<any> => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      paymentData;
    const response = await httpWithoutCredentials.post(
      "/payment/verifyRazorpayPayment",
      {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to verify Razorpay payment");
  }
};

export const openRazorpayModal = (
  orderData: RazorpayOrderResponse,
  onSuccess: (response: RazorpayPaymentResponse) => void,
  onFailure: (error: any) => void,
  onCancel: () => void
) => {
  console.log("Opening Razorpay modal with order data:", orderData);
  console.log("Amount being sent to Razorpay:", orderData.amount);
  console.log("Amount in rupees (amount/100):", orderData.amount / 100);

  const options = {
    key: orderData.key,
    amount: orderData.amount,
    //amount: 1 * 100,
    currency: orderData.currency,
    name: import.meta.env.VITE_SHOP_NAME,
    description: "Order Payment",
    image: "/assets/images/Logo2.jpg",
    order_id: orderData.orderId,
    handler: (res) => {
      console.log("openRazorpayModal response", res);

      onSuccess(res);
    },
    modal: {
      ondismiss: onCancel,
    },
    theme: {
      color: "#1B4C8C",
    },
    config: {
      display: {
        hide: [
          {
            method: "cardless_emi",
          },
          {
            method: "paylater",
          },
        ],
      },
    },
    allow_rotation: true,
  };

  const rzp1 = new (window as any).Razorpay(options);

  rzp1.on("payment.failed", onFailure);
  rzp1.open();

  return rzp1;
};
