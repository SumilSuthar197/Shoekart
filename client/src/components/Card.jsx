import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartslice";
import Star from "./Star";
const Card = (data) => {
  const dispatch = useDispatch();
  const toTitleCase = (word) => {
    let letterCapitalizer = (match) =>
      match.substring(0, 1).toUpperCase() + match.substring(1);
    return word.split(" ").map(letterCapitalizer).join(" ");
  };
  return (
    <div className="card-container">
      <Link to={`/product/${data.slug}`} style={{ textDecoration: "none" }}>
        <div className="image-div">
          <img src={data.image} alt="image" height="240px" />
        </div>
      </Link>
      <div className="desc">
        <Link to={`/product/${data.slug}`} style={{ textDecoration: "none" }}>
          <h5>{data.brand}</h5>
          <h6>{toTitleCase(data.name)}</h6>
        </Link>
        <div className="star">
          {<Star rating={data.ratingScore / data.ratings.length || 0} />}
        </div>
        <h4>₹ {data.price}</h4>
      </div>
      <button
        className="btn-cart"
        onClick={() => {
          dispatch(addItem(data._id));
        }}
      >
        <span className="add-to-cart">
          <FaShoppingCart />
        </span>
      </button>
    </div>
  );
};

export default Card;
