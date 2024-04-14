import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Star from "./Star";
import { memo, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import SizeModal from "./SizeModal";
const Card = (data) => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const toTitleCase = (word) => {
    let letterCapitalizer = (match) =>
      match.substring(0, 1).toUpperCase() + match.substring(1);
    return word.split(" ").map(letterCapitalizer).join(" ");
  };
  const handleAddToCart = async (len) => {
    try {
      if (!auth) {
        toast.error("Login required");
        navigate("/login");
        return;
      } else if (len === 0) {
        toast.error("Out of stock");
        return;
      }
      setShowModal((prev) => !prev);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="card-container">
      {showModal && (
        <SizeModal
          id={data._id}
          size={data.sizeQuantity}
          onClose={() => setShowModal((prev) => !prev)}
        />
      )}
      <Link to={`/product/${data.slug}`} style={{ textDecoration: "none" }}>
        <div className="image-div">
          <img src={data.image} alt="image" height="240px" loading="lazy" />
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
        onClick={() => handleAddToCart(data.sizeQuantity.length)}
      >
        <span className="add-to-cart">
          <FaShoppingCart />
        </span>
      </button>
    </div>
  );
};

export default memo(Card);
