import { useEffect, useState } from "react";
import kid from "../Images/kid.webp";
import men from "../Images/men.webp";
import women from "../Images/women.webp";
import Card from "../components/Card";
import Container from "../components/Container";
import Countdown from "../components/Countdown";
import BannerSection from "../components/BannerSection";
import FeaturedIcon from "../components/FeaturedIcon";
import LandingBanner from "../components/LandingBanner";
import "../styles/landingpage.css";
import Axios from "../Axios";

const LandingPage = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("/product/featured");
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <LandingBanner />

      <section id="trending" className="title">
        <h1>Who You Are Shopping For?</h1>
      </section>

      <section className="shopping-gender">
        <img src={men} alt="" />
        <img src={women} alt="" />
        <img src={kid} alt="" />
      </section>

      <section id="trending" className="title">
        <h1>New Arrivals</h1>
        <h2>summer collection new modern design</h2>
      </section>

      <Container />
      {data?.featured && data.featured.length > 0 && (
        <>
          <section id="featuredProd" className="title">
            <h1>Featured Products</h1>
            <h2>The new modern design summer collection</h2>
          </section>

          <section className="Featured-products">
            <div className="product-container">
              {data.featured.map((item) => {
                return <Card key={item._id} {...item} />;
              })}
            </div>
          </section>
        </>
      )}

      <Countdown />

      {data?.trending && data.trending.length > 0 && (
        <>
          <section className="title">
            <h1>Hot Deal On Sales</h1>
            <h2>The new modern design summer collection</h2>
          </section>
          <section className="Featured-products">
            <div className="product-container">
              {data.trending.map((item) => {
                return <Card key={item._id} {...item} />;
              })}
            </div>
          </section>
        </>
      )}
      <FeaturedIcon />
      <BannerSection />
    </>
  );
};

export default LandingPage;
