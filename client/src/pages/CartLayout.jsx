import "../styles/cartlayout.css";
import CartItems from "../components/CartItems";
import { useEffect, useState } from "react";
import Axios from "../Axios";
import useAuth from "../../hooks/useAuth";
import TriangleLoader from "../components/TriangleLoader";
import { toast } from "react-toastify";
import EmptyImage from "../Images/empty-cart.png";

const CartLayout = () => {
  const { auth, setAuth } = useAuth();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("jwt");
  const deleteItem = async (id, qty) => {
    try {
      const response = await Axios.delete(`/cart/delete/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      if (response.data.success === true) {
        toast.success("Product removed from cart successfully");
        setData(response.data.cart);
        setAuth({ ...auth, cartSize: auth.cartSize - qty });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  const fetchData = async () => {
    try {
      const response = await Axios.get("/cart", {
        headers: {
          Authorization: token,
        },
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (loading) return <TriangleLoader height="500px" />;
  return (
    <div className="cartMainContainer">
      <h1 className="cHeader">Shopping Cart</h1>
      <div className="cartContainer">
        <div className="cart-container-1">
          <table className="cart-table">
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Product</th>
                <th className="cart-subheader">Size</th>
                <th className="cart-subheader">Quantity</th>
                <th className="cart-subheader">Total Price</th>
              </tr>
            </thead>
            <tbody className="cart-table-tbody">
              {data &&
                data.items.map((item) => {
                  return (
                    <CartItems
                      key={item._id}
                      data={item.productId}
                      qty={item.qty}
                      size={item.size}
                      deleteItem={() => deleteItem(item._id, item.qty)}
                    />
                  );
                })}
            </tbody>
          </table>
          {(!data || data.items.length <= 0) && (
            <div className="empty-cart">
              <img src={EmptyImage} alt="empty-cart" />
              <p>Looks like you haven't added any items to the cart yet.</p>
            </div>
          )}
        </div>
        <div className="cart-container-2">
          <div className="cartSummary">
            <h3 className="summaryHeader">Order Summary</h3>
            <div className="summaryInfo">
              <p>
                <span>Sub Total</span>
                <span>
                  ₹{" "}
                  {(data?.totalPrice - data?.totalPrice * 0.12 || 0).toFixed(2)}
                </span>
              </p>
              <p>
                <span>Tax</span>
                <span>₹ {(data?.totalPrice * 0.12 || 0).toFixed(2)}</span>
              </p>
              <p>
                <span>Shipping Charge</span>
                <span>Free</span>
              </p>
              <p>
                <span>Giftcard/Discount code</span>
                <span>- ₹ 0</span>
              </p>
              <div className="couponInput">
                <input
                  type="text"
                  name="couponCode"
                  id="couponCode"
                  placeholder="Coupon Code"
                />
                <button>Apply</button>
              </div>
              <p className="cart-total">
                <span>Total</span>
                <span>₹ {(data?.totalPrice || 0).toFixed(2)}</span>
              </p>
            </div>
            <button type="submit" className="checkout-btn">
              checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartLayout;
