/* eslint-disable react-refresh/only-export-components */
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartslice";
import Star from "./Star";
import { memo } from "react";
import { toast } from "react-toastify";
import Axios from "../Axios";
import useAuth from "../../hooks/useAuth";
const Card = (data) => {
  // const dispatch = useDispatch();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const toTitleCase = (word) => {
    let letterCapitalizer = (match) =>
      match.substring(0, 1).toUpperCase() + match.substring(1);
    return word.split(" ").map(letterCapitalizer).join(" ");
  };
  const handleAddToCart = async () => {
    if (!auth) {
      toast.error("Login required");
      navigate("/login");
      return;
    }
    const sizes = data.sizeQuantity.map((item) => item.size);
    const size = window.prompt(
      `Please enter your size\nAvailable sizes are UK ${sizes.join(", ")}:`
    );
    if (!size || !sizes.includes(Number(size))) {
      toast.error("Please enter a valid size", {
        position: "bottom-right",
      });
    } else {
      try {
        const { cartSize, token } = auth;
        const response = await Axios.post(
          "/cart/add",
          {
            productId: data._id,
            qty: 1,
            size: Number(size),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(response?.data?.message);
        setAuth({ ...auth, cartSize: cartSize + 1 });
        localStorage.setItem(
          "user",
          JSON.stringify({ ...auth, cartSize: cartSize + 1 })
        );
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
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
      <button className="btn-cart" onClick={handleAddToCart}>
        <span className="add-to-cart">
          <FaShoppingCart />
        </span>
      </button>
    </div>
  );
};

export default memo(Card);
