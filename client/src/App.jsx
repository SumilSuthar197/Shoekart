import {
  BrowserRouter,
  Route,
  // RouterProvider,
  Routes,
  // useLocation,
  // createBrowserRouter,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProductDetails from "./components/ProductDetails";
// import { loader as singleProductLoader } from "./components/ProductDetails";
// import { useEffect } from "react";
import CartLayout from "./pages/CartLayout";
import ContactPage from "./pages/ContactPage";
import Product from "./pages/Product";
import HomeLayout from "./pages/HomeLayout";
// import { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomeLayout />,
//     errorElement: <h1>error</h1>,
//     children: [
//       {
//         index: true,
//         element: <LandingPage />,
//         errorElement: <h1>error</h1>,
//         // loader: landingLoader(queryClient),
//       },
//       {
//         path: "product/:id",
//         loader: singleProductLoader(),
//         element: <ProductDetails />,
//       },
//       {
//         path: "about",
//         element: <h1>hello</h1>,
//       },
//       {
//         path: "products",
//         element: <Product />,
//       },
//       {
//         path: "cart",
//         element: <CartLayout />,
//       },
//       {
//         path: "contact",
//         element: <ContactPage />,
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: <LoginPage />,
//   },
//   {
//     path: "/signup",
//     element: <SignUpPage />,
//   },
// ]);

const App = () => {
  const { setAuth } = useAuth();
  useEffect(() => {
    const rememberedUser = localStorage.getItem("user");
    if (rememberedUser) {
      setAuth(JSON.parse(rememberedUser));
    }
  }, []);
  // useEffect(() => {
  //   const handleNavigation = () => {
  //     window.scrollTo(0, 0);
  //   };
  //   return () => router.subscribe(handleNavigation);
  // }, []);
  // return <RouterProvider router={router} />;
  // const location = useLocation();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [location]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="about" element={<h1>hello</h1>} />
          <Route path="products" element={<Product />} />
          <Route path="cart" element={<CartLayout />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// import Footer from "./components/Footer/Footer"
// import Navbar from "./components/Navbar/Navbar"

// function App() {
//   return <div>
//     <Navbar/>
//     <Footer/>
//   </div>
// }

// export default App
