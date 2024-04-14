import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { createContext, useEffect, useState } from "react";
import TriangleLoader from "../components/TriangleLoader";
import Axios from "../Axios";

export const LoadingContext = createContext();

const HomeLayout = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("/product/featured");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <div style={{background:"#F7ECDE"}}>
        <TriangleLoader height="100vh" />
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <section className="page">
        <LoadingContext.Provider value={{ data, setData }}>
          <Outlet />
        </LoadingContext.Provider>
      </section>
      <Footer />
    </>
  );
};
export default HomeLayout;
