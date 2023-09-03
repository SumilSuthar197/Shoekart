import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProductDetails from "./components/ProductDetails";
import { loader as singleProductLoader } from "./components/ProductDetails";
import { useEffect } from "react";
import CartLayout from "./pages/CartLayout";
import ContactPage from "./pages/ContactPage";
import Product from "./pages/Product";
import HomeLayout from "./pages/HomeLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout/>,
    errorElement: <h1>error</h1>,
    children: [
      {
        index: true,
        element: <LandingPage />,
        errorElement: <h1>error</h1>,
        // loader: landingLoader(queryClient),
      },
      {
        path: "product/:id",
        loader: singleProductLoader(),
        element: <ProductDetails />,
      },
      {
        path: "about",
        element: <h1>hello</h1>,
      },
      {
        path: "products",
        element: <Product/>,
      },
      {
        path: "cart",
        element: <CartLayout />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
    ],
  },
]);

const App = () => {
  useEffect(() => {
    const handleNavigation = () => {
      window.scrollTo(0, 0);
    };

    // Add the event listener for navigation changes

    // Cleanup the event listener on unmount
    return () => router.subscribe(handleNavigation);
  }, []);
  return <RouterProvider router={router} />;
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
