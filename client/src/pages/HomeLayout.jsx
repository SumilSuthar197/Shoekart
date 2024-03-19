import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <section className="page">
        <Outlet />
      </section>
      <Footer />
    </>
  );
};
export default HomeLayout;
