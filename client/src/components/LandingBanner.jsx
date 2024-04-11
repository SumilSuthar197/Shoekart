import image from "../Images/MAIN-SECTION.svg";

const LandingBanner = () => {
  return (
    <section className="main-Container">
      <p className="p1">THE NEW {new Date().getFullYear()}</p>
      <p className="p2">AIR JORDAN</p>
      <div className="main-img-cont">
        <img className="main-img" src={image} alt="First slide" />
        <p className="p3">
          <span>UNWRAP</span>
          <span> POSSIBILITIES</span>
        </p>
      </div>
      <p className="p4">UNWRAP POSSIBILITIES</p>
    </section>
  );
};

export default LandingBanner;
