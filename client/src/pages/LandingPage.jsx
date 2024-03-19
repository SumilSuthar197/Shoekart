import image1 from "../Images/MAIN-SECTION.svg";
import kid from "../Images/kid.webp";
import men from "../Images/men.webp";
import women from "../Images/women.webp";
import b1 from "../Images/b1.webp";
import b2 from "../Images/b2.webp";
import b3 from "../Images/b3.webp";
import b4 from "../Images/b4.webp";
import b5 from "../Images/b5.webp";
import Card from "../components/Card";
import Container from "../components/Container";
import Countdown from "../components/Countdown";
import "../styles/landingpage.css";

const LandingPage = () => {
  return (
    <>
      <section className="main-Container">
        <p className="p1">THE NEW {new Date().getFullYear()}</p>
        <p className="p2">AIR JORDAN</p>
        <div className="main-img-cont">
          <img className="main-img" src={image1} alt="First slide" />
          <p className="p3">
            <span>UNWRAP</span>
            <span> POSSIBILITIES</span>
          </p>
        </div>
        <p className="p4">UNWRAP POSSIBILITIES</p>
      </section>

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

      <section id="featuredProd" className="title">
        <h1>Featured Products</h1>
        <h2>The new modern design summer collection</h2>
      </section>

      <section className="Featured-products">
        {/* <div className="product-container">
          {featuredProducts.map((item) => {
            return <Card key={item.id} {...item} />;
          })}
        </div> */}
      </section>

      <Countdown Date={"October 5, 2024 12:00:00"} />

      <section className="title">
        <h1>Hot Deal On Sales</h1>
        <h2>The new modern design summer collection</h2>
      </section>

      <section className="Featured-products">
        {/* <div className="product-container">
          {trendingProducts.map((item) => {
            return <Card key={item.id} {...item} />;
          })}
        </div> */}
      </section>

      <section className="features">
        <div className="features-icon">
          <div>
            <img src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/70/null/external-quality-logistic-delivery-kiranshastry-lineal-kiranshastry.png" />
          </div>
          <div>
            <h5>100% ORIGINAL GUARANTEE</h5>
          </div>
        </div>
        <div className="features-icon">
          <div>
            <img src="https://img.icons8.com/ios/64/null/security-checked--v1.png" />
          </div>
          <div>
            <h5>100% SECURE PAYMENT</h5>
          </div>
        </div>
        <div className="features-icon">
          <div>
            <img src="https://img.icons8.com/external-konkapp-detailed-outline-konkapp/74/null/external-fast-delivery-logistic-and-delivery-konkapp-detailed-outline-konkapp.png" />
          </div>
          <div>
            <h5>DELIVERY WITHIN 48 HOURS</h5>
          </div>
        </div>
        <div className="features-icon">
          <div>
            <img src="https://img.icons8.com/external-victoruler-outline-victoruler/64/null/external-return-box-logistics-victoruler-outline-victoruler.png" />
          </div>
          <div>
            <h5>RETURN WITHIN 30 DAYS</h5>
          </div>
        </div>
      </section>
      <section className="banner">
        <div className="banner-row-1">
          <img src={b1} alt="Banner-Image" />
          <img src={b2} alt="Banner-Image" />
          <img className="banner3" src={b4} alt="Banner-Image" />
        </div>
        <div className="banner-row-2">
          <img className="banner3" src={b5} alt="Banner-Image" />
          <img src={b3} alt="Banner-Image" />
        </div>
      </section>
    </>
  );
};

export default LandingPage;
