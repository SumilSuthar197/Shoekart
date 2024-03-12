import image3 from "../Images/shoes/image 3.svg";
import image1 from "../Images/shoes/image 1.svg";
import image2 from "../Images/shoes/image 2.svg";
import image4 from "../Images/shoes/image 4.svg";

const Container = () => {
  const boxes = [
    { id: 1, image: image4, color: "#e6e2d9" },
    { id: 2, image: image2, color: "#64aedd" },
    { id: 3, image: image1, color: "#42a3c7" },
    { id: 4, image: image2, color: "#295eb4" },
    { id: 5, image: image3, color: "#08214a" },
  ];
  const zoomIn = (id) => {
    document.querySelector(`.box1-container${id}`).classList.add("slide-max");
    boxes
      .filter((box) => box.id !== id)
      .forEach((box) =>
        document
          .querySelector(`.box1-container${box.id}`)
          .classList.add("slide-min")
      );
  };

  const zoomOut = (id) => {
    document
      .querySelector(`.box1-container${id}`)
      .classList.remove("slide-max");
    boxes
      .filter((box) => box.id !== id)
      .forEach((box) =>
        document
          .querySelector(`.box1-container${box.id}`)
          .classList.remove("slide-min")
      );
  };
  return (
    <section className="New-Arrival">
      <div className="box1">
        {boxes.map((box) => (
          <div
            key={box.id}
            className={`box1-container${box.id}`}
            onMouseEnter={() => zoomIn(box.id)}
            onMouseLeave={() => zoomOut(box.id)}
            style={{ backgroundColor: box.color }}
          >
            <img src={box.image} alt="" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Container;
