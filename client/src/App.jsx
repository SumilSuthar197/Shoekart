import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProductDetails from "./pages/ProductDetails";
import CartLayout from "./pages/CartLayout";
import ContactPage from "./pages/ContactPage";
import Product from "./pages/Product";
import HomeLayout from "./pages/HomeLayout";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import ErrorPage from "./pages/ErrorPage";
import Axios from "./Axios";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import ProfileLayout from "./pages/ProfileLayout";
import MyOrders from "./pages/MyOrders";
import ProtectedRoute from "./utils/protectedRoute";
import AdminRoute from "./utils/adminRoute";
import AdminLayout from "./pages/AdminLayout";
import Dashboard from "./pages/Dashboard";
import AdminLogin from "./pages/AdminLogin";
import CustomerList from "./pages/CustomerList";
import CouponList from "./pages/CouponList";
import AdminOrders from "./pages/AdminOrders";
import AdminProductList from "./pages/AdminProductList";
import AddProducts from "./pages/AddProducts";
import UpdateProducts from "./pages/UpdateProducts";
import BrandList from "./pages/BrandList";
import CategoryList from "./pages/CategoryList";

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
    console.log("App.js");
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
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="product/:slug" element={<ProductDetails />} />
          <Route path="about" element={<h1>hello</h1>} />
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
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="checkout-success" element={<CheckoutSuccess />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
