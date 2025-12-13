export interface ICategory {
  _id: string;
  name: string;
  image: string;
  description: string;
}

export interface ICategoryWithProducts extends ICategory {
  data: ICategoryWithProducts | null;
  products: IProduct[];
}

export interface IProduct {
  sizes: string[];
  _id: string;
  title: string;
  posterURL: string;
  price: number;
  MRPprice: number;
  productCode: string;
  discount: number;
}
export interface IMyBagLocalStorage {
  products: IProductDetailLocalStorage[];
}

export interface IProductDetailLocalStorage {
  productId: string;
  sizes: ISizeLocalStorage[];
}

export interface ISizeLocalStorage {
  size: string;
  qty: number;
  netWeight: number;
}

export interface ISize {
  sizes: ISizeDetail[];
}

export interface ISizeDetail {
  size: string;
  inStock: number;
  price: number;
  MRPprice: number;
  netWeight: number;
  _id: string;
}

export interface IProductDetails {
  _id: string;
  title: string;
  images: string[];
  sizes: ISizeDetail[];
  price: number;
  // MRPprice: number;
  // color: string[];
  // count: number;
  // discount: number;
  description: string;
  productCode: string;
  netWeight: number;
  materialType: string;
  posterURL: string;
  category: string;
}

export interface ISnackBarContextType {
  snackBarState: {
    snackbarOpen: boolean;
    snackbarMessage: string;
    snackbarSeverity: string;
  };
  updateSnackBarState: (
    isOpen: boolean,
    message: any,
    severity: string
  ) => void;
}
export interface IMyBagCountValue {
  mybagCount: number;
  updateMyBagCount: any;
}

export interface IMyBagProducts {
  _id: string;
  posterURL: string;
  title: string;
  price: number;
  productCode: string;
  sizes: IMyBagProductSizes[];
}

export interface IMyBagProductSizes {
  size: string;
  price: number;
  qty: number;
}
export interface ISearchProduct {
  _id: string;
  title: string;
  discount: number;
  productCode: string;
  posterURL: string;
  sizes: string[];
  price: number;
}

export interface IDateWiseOrders {
  orderedDate: string;
  orders: IOrderFilter[];
}

export interface IOrderFilter {
  _id: string;
  orderNumber: string;
  totalPrice: number;
  status: number;
  image: string;
  orderedDateAndTime: Date;
  productdetail: IProductdetailFilter[];
  showposter: string;
  deliveryFee: number
}

export interface IProductdetailFilter {
  productId: string;
  title: string;
  productcode: string;
  posterURL: string;
  sizes: IMyBagProductSizes[];
}

export interface IMyBagSummary {
  itemsPrice: number;
  itemsCount: number;
}

export interface IMyBagObject extends IMyBagSummary {
  result: IMyBagProducts[];
}

export interface ICheckOut {
  itemsPrice: number;
  orderTotal: number;
  netWeightTotal: number;
}

export interface ICheckOutValidation {
  productId: string;
  productCode?: string;
  errors: IError[];
}

export interface IError {
  size: string;
  error: string;
}
export interface IAuthContext {
  user: IUser | null;
  updateUserData: (user: IUser | null) => void;
}

export interface IUser {
  userId: string | null;
  phoneNumber: string | null;
  name: string | null;
  isReseller: boolean;
  role: string | null;
}

export interface ILoginResponse {
  data: IUser | null;
  message: string;
  status?: boolean;
}

export interface ILoginFormInputs {
  phoneNumber: string;
  password: string;
  role?: string
}

export interface ISignUp {
  phoneNumber: string | undefined;
  password: string;
  name: string;
  email?: string;
  confirmPassword: string;
  role?: string;
}

export interface IUserProfile {
  _id?: string;
  name: string;
  phoneNumber: string;
  email: string;
}

export interface IOrder {
  userId: string;
  items: string; //local storage value
  shippingDetail: IOrderShippingdetail;
  // razorPay: IRazorPay;
  paymentInfo?: PhonePePaymentInitiateData;
  deliveryFee: number;
}

export interface IOrderProducts {
  productId: string;
  sizes: ISize[];
}

export interface IOrderSize {
  size: string;
  qty: number;
  price: number;
}

export interface IOrderShippingdetail {
  address: string;
  phoneNumber: string;
  pincode: string;
  district: string;
  state: string;
  customerName: string;
}

export interface IRazorPay {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  receipt: string;
  paidAmount: number;
}

export interface RazorpayOrderResponse {
  orderId:string;
  amount: number;
  currency: string;
  receipt: string;
  key: string;
}
export interface RazorpayPaymentBase {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpayPaymentResponse extends RazorpayPaymentBase {}

export interface RazorpayVerifyRequest extends RazorpayPaymentBase {}

export type PhonePePaymentInitiateData = {
  merchantId: string;
  merchantTransactionId: string;
  status: string;
  originalTransactionId: string;
};

export type CommonResponse<T> = {
  data: T;
  success: boolean;
  message: string;
};
