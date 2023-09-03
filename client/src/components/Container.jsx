import image4 from "../Images/shoes/image 3.svg";
import image2 from "../Images/shoes/image 1.svg";
import image3 from "../Images/shoes/image 2.svg";
import image5 from "../Images/shoes/image 4.svg";

const Container = () => {
  const zoomIn = (n) => {
    for (let i = 1; i <= 5; i++) {
      if (i === n) {
        document
          .querySelector(`.box1-container${i}`)
          .classList.add("slide-max");
      } else {
        document
          .querySelector(`.box1-container${i}`)
          .classList.add("slide-min");
      }
    }
  };

  const zoomOut = (n) => {
    for (let i = 1; i <= 5; i++) {
      if (i === n) {
        document
          .querySelector(`.box1-container${i}`)
          .classList.remove("slide-max");
      } else {
        document
          .querySelector(`.box1-container${i}`)
          .classList.remove("slide-min");
      }
    }
  };
  return (
    <>
      <section className="New-Arrival">
        <div className="box1">
          <div
            className="box1-container1"
            onMouseEnter={() => zoomIn(1)}
            onMouseLeave={() => zoomOut(1)}
            style={{ backgroundColor: "#e6e2d9" }}
          >
            <h1 className="subheading1">JORDAN</h1>
            <img src={image5} alt="" />
          </div>
          <div
            className="box1-container2"
            onMouseEnter={() => zoomIn(2)}
            onMouseLeave={() => zoomOut(2)}
            style={{ backgroundColor: "#64aedd" }}
          >
            <h1 className="subheading2">JORDAN</h1>
            <img src={image3} alt="" />
          </div>
          <div
            className="box1-container3"
            onMouseEnter={() => zoomIn(3)}
            onMouseLeave={() => zoomOut(3)}
            style={{ backgroundColor: "#42a3c7" }}
          >
            <h1 className="subheading3">JORDAN</h1>
            <img src={image2} alt="" />
          </div>
          <div
            className="box1-container4"
            onMouseEnter={() => zoomIn(4)}
            onMouseLeave={() => zoomOut(4)}
            style={{ backgroundColor: "#295eb4" }}
          >
            <h1 className="subheading4">JORDAN</h1>
            <img src={image3} alt="" />
          </div>
          <div
            className="box1-container5"
            onMouseEnter={() => zoomIn(5)}
            onMouseLeave={() => zoomOut(5)}
            style={{ backgroundColor: "#08214a" }}
          >
            <h1 className="subheading5">JORDAN</h1>
            <img src={image4} alt="" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Container;
