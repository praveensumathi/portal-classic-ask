export enum paths {
  ROOT = "/",
  PROFILE = "profile",
  ORDERS = "orders",
  PRIVACYPOLICY = "privacyPolicy",
  PRODUCTSBYCATEGORY = "productsByCategory/:categoryId",
  PRODUCTDETAIL = "productDetail/:productId",
  CHECKOUT = "checkout",
  RESETPASSWORD = "resetPassword",
  SIGNUP = "signup",
  LOGIN = "login",
  ORDERSUCCESS = "/order-success",
  ORDERERROR = "/order-fail",
  PAYMENT_PROCESSING = 'payment-processing/:mId/:mTxId'
}
