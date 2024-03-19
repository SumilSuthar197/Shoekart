import { AiFillDelete, AiFillHeart } from "react-icons/ai";
import { HiMinusCircle, HiPlusCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { memo } from "react";

const CartItems = ({ data, qty, size, deleteItem }) => {
  return (
    <tr>
      <td>
        <div className="cart-product-cont">
          <div className="cart-image-cont">
            <Link
              to={`/product/${data.slug}`}
              style={{ textDecoration: "none" }}
            >
              <img src={data.image} alt="cart-img" />
            </Link>
          </div>
          <div className="cart-name-cont">
            <p style={{ textAlign: "left" }}>Nike {data.name}</p>
            <div className="cart-name-cont-btn">
              <button onClick={deleteItem}>
                <AiFillDelete /> delete item
              </button>
              <button>
                <AiFillHeart /> move to favorite
              </button>
            </div>
          </div>
        </div>
        <div className="cart-mobile-info">
          <p>Size: {size}</p>
          <p>Quantity: {size}</p>
          <p>Price: ₹ {data.price}/item</p>
        </div>
      </td>
      <td className="cart-subheader">
        <p>{size}</p>
      </td>
      <td className="td-qty cart-subheader">
        <div>
          <button>
            <HiMinusCircle />
          </button>
          <p>{qty}</p>
          <button>
            <HiPlusCircle />
          </button>
        </div>
      </td>
      <td className="cart-subheader">
        <p>₹ {qty * data.price}</p>
      </td>
    </tr>
  );
};

export default memo(CartItems);
