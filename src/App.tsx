import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { paths } from "./routes/paths";
import SnackBarProvider from "./context/SnackBarContext";
import CustomSnackBar from "./common/components/CustomSnackBar";
import ProductDetail from "./pages/ProductDetails/ProductDetail";
import DrawerProvider from "./context/DrawerContext";
import CheckOut from "./pages/CheckOut/CheckOut";
import BagProvider from "./context/MyBagContext";
import ResetPassword from "./pages/Auth/ResetPasswordPage";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Profile from "./pages/Profile/Profile";
import CategoryProducts from "./pages/CategoryProducts/CategoryProducts";
import Signup from "./common/components/Signup";
import AuthProvider from "./context/AuthContext";
import Orders from "./pages/Orders/Orders";
import Login from "./common/components/Login";
import OrderSuccessPage from "./pages/Orders/OrderSuccessPage";
import OrderErrorPage from "./pages/Orders/OrderErrorPage";
import { lazy } from "react";

const queryClient = new QueryClient();

const PaymentProcessing = lazy(
  () => import("./pages/CheckOut/PaymentProcessing")
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BagProvider>
          <SnackBarProvider>
            <DrawerProvider>
              <Routes>
                <Route path={paths.ROOT} element={<Layout />}>
                  <Route index element={<Home />}></Route>
                  <Route
                    path={paths.ORDERSUCCESS}
                    element={<OrderSuccessPage />}
                  />
                  <Route path={paths.ORDERERROR} element={<OrderErrorPage />} />
                  <Route path={paths.PRIVACYPOLICY} element={<About />}></Route>
                  <Route path={paths.PROFILE} element={<Profile />}></Route>
                  <Route
                    path={paths.PRODUCTSBYCATEGORY}
                    element={<CategoryProducts />}
                  ></Route>
                  <Route
                    path={paths.PRODUCTDETAIL}
                    element={<ProductDetail />}
                  />

                  <Route path={paths.ORDERS} element={<Orders />} />
                  <Route path={paths.CHECKOUT} element={<CheckOut />} />
                  <Route
                    path={paths.SIGNUP}
                    element={<Signup requiredHeading={true} />}
                  />
                  <Route
                    path={paths.LOGIN}
                    element={<Login requiredHeading={true} />}
                  />

                  <Route
                    path={paths.PAYMENT_PROCESSING}
                    element={<PaymentProcessing />}
                  />
                </Route>

                <Route path={paths.RESETPASSWORD} element={<ResetPassword />} />
              </Routes>
              <CustomSnackBar />
            </DrawerProvider>
          </SnackBarProvider>
        </BagProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
