import shoeImage from "../Images/shoes/s1.svg";
import { AiFillDelete, AiFillHeart } from "react-icons/Ai";
import { HiMinusCircle, HiPlusCircle } from "react-icons/Hi";
import { useDispatch } from "react-redux";
import { removeItem, increase, decrease } from "../features/cart/cartslice";
import { Link } from "react-router-dom";

const CartItems = (Data) => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="cartProduct">
        <h5 className="cProduct-name">
          <Link to={`/product/${Data.id}`} style={{ textDecoration: "none" }}>
            <img src={shoeImage} alt="image" />
          </Link>
          <span>
            {Data.name}
            <br />
            <div className="cartItemDetails">
              <button
                className="cartPageBtn1"
                onClick={() => {
                  dispatch(removeItem(Data.id));
                }}
              >
                <AiFillDelete /> Remove item
              </button>
              <button className="cartPageBtn1">
                <AiFillHeart /> Move to favorite
              </button>
            </div>
          </span>
        </h5>
        <h5 className="cSize">11</h5>
        <h5 className="cPrice">${Data.price}</h5>
        <h5 className="cQuantity">
          <button
            onClick={() => {
              if (Data.inCart === 1) {
                dispatch(removeItem(Data.id));
                return;
              }
              dispatch(decrease(Data.id));
            }}
          >
            <HiMinusCircle />
          </button>{" "}
          {Data.inCart}{" "}
          <button
            onClick={() => {
              dispatch(increase(Data.id));
            }}
          >
            <HiPlusCircle />
          </button>
        </h5>
        <h5 className="cTotal">${Data.inCart * Data.price} </h5>
      </div>
    </div>
  );
};

export default CartItems;
