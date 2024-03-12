import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomeLayout = () => {
  // const navigation = useNavigation();

  // const isPageLoading = navigation.state === 'loading';
  // const value = "some value";
  return (
    <>
      <Navbar />
      <section className="page">
        {/* {isPageLoading ? (
          <div className='loading' />
        ) : ( */}
        <Outlet />
        {/* )} */}
      </section>
      <Footer />
    </>
  );
};
export default HomeLayout;
