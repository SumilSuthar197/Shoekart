import b1 from "../Images/b1.webp";
import b2 from "../Images/b2.webp";
import b3 from "../Images/b3.webp";
import b4 from "../Images/b4.webp";
import b5 from "../Images/b5.webp";

const BannerSection = () => {
  return (
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
  );
};

export default BannerSection;
