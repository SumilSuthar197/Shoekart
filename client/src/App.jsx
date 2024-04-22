import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProductDetails from "./pages/ProductDetails";
import CartLayout from "./pages/CartLayout";
import ContactPage from "./pages/ContactPage";
import Product from "./pages/Product";
import HomeLayout from "./pages/HomeLayout";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ErrorPage from "./pages/ErrorPage";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import ProfileLayout from "./pages/ProfileLayout";
import AdminLogin from "./pages/AdminLogin";
import MyOrders from "./pages/MyOrders";
import Axios from "./Axios";
import useAuth from "../hooks/useAuth";
import ProtectedRoute from "./utils/protectedRoute";
import AdminRoute from "./utils/adminRoute";
import TriangleLoader from "./components/TriangleLoader";
import ResetPassword from "./pages/ResetPassword";

const AdminLayout = lazy(() => import("./pages/AdminLayout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CustomerList = lazy(() => import("./pages/CustomerList"));
const CouponList = lazy(() => import("./pages/CouponList"));
const AdminOrders = lazy(() => import("./pages/AdminOrders"));
const AdminProductList = lazy(() => import("./pages/AdminProductList"));
const AddProducts = lazy(() => import("./pages/AddProducts"));
const UpdateProducts = lazy(() => import("./pages/UpdateProducts"));
const BrandList = lazy(() => import("./pages/BrandList"));
const CategoryList = lazy(() => import("./pages/CategoryList"));

const App = () => {
  const { setAuth } = useAuth();
  const ScrollToTop = () => {
    const { pathname } = useLocation();
    console.log("ScrollToTop");
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };
  useEffect(() => {
    const rememberedUserToken = localStorage.getItem("jwt") || "";
    const fetchUser = async () => {
      try {
        const response = await Axios.get("/verify", {
          headers: { Authorization: rememberedUserToken },
        });
        if (response.data.success) {
          setAuth(response.data.user);
        }
      } catch (error) {
        setAuth(null);
        if (error?.response?.status === 401) {
          localStorage.removeItem("jwt");
        }
      }
    };
    if (rememberedUserToken === "") {
      setAuth(null);
      return;
    } else {
      fetchUser();
    }
  }, []);
  return (
    <BrowserRouter>
      <Suspense fallback={<TriangleLoader height="100vh" />}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="product/:slug" element={<ProductDetails />} />
            <Route path="products" element={<Product />} />
            <Route path="cart" element={<CartLayout />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <ProfileLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<MyOrders />} />
          </Route>
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="customers" element={<CustomerList />} />
            <Route path="coupons" element={<CouponList />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProductList />} />
            <Route path="product/add" element={<AddProducts />} />
            <Route path="product/update/:slug" element={<UpdateProducts />} />
            <Route path="brands" element={<BrandList />} />
            <Route path="category" element={<CategoryList />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="checkout-success" element={<CheckoutSuccess />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
