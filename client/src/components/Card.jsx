import { Link } from "react-router-dom";
//  useOutletContext
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartslice";
const Card = (data) => {
  const dispatch = useDispatch();
  return (
    <div className="card-container">
      <Link to={`/product/${data.id}`} style={{ textDecoration: "none" }}>
        <div className="image-div">
          <img src="https://shoes-ecommerce-site.netlify.app/images/shoes/s2.svg" alt="image" height="240px" />
        </div>
      </Link>
      <div className="desc">
        <Link to={`/product/${data.id}`} style={{ textDecoration: "none" }}>
          <h5>Jordan</h5>
          <h6>{data.name}</h6>
        </Link>
        <div className="star">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
        <h4>${data.price}</h4>
      </div>

      <button
        className="btn-cart"
        onClick={() => {
          dispatch(addItem(data.id));
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
