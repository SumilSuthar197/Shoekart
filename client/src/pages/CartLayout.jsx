import "../styles/cartlayout.css";
import CartItems from "../components/CartItems";
import { useSelector } from "react-redux";

const CartLayout = () => {
  const { cartItem, amount, total, discountCoupon } = useSelector(
    (store) => store.cart
  );
  var emptyString = "";
  if (amount < 1) {
    emptyString = "Your bag is empty";
  }
  return (
    <div className="cartMainContainer">
      <h1 className="cHeader">Shopping Cart</h1>
      <div className="cartContainer">
        <div className="cartContainer1">
          <div className="cartHeader">
            <h5 className="cProduct-name p-10">Product</h5>
            <h5 className="cSize">Size</h5>
            <h5 className="cPrice">Price</h5>
            <h5 className="cQuantity">Quantity</h5>
            <h5 className="cTotal">Total Price</h5>
          </div>
          <div className="cartItems">
            {cartItem.map((item) => {
              return <CartItems key={item.id} {...item} />;
            })}
            <center style={{ margin: "15px 0 0" }}>{emptyString}</center>
          </div>
        </div>
        <div className="cartContainer2">
          <div className="cartSummary">
            <p className="summaryHeader">Order Summary</p>
            <p className="subTotal">
              <span>Sub Total :</span>
              <span className="cs-prize">${total}</span>
            </p>
            <p className="tax">
              <span>Tax :</span>
              <span className="cs-prize">${(total * 0.12).toFixed(2)}</span>
            </p>
            <p className="shippingCharge">
              <span>Shipping Charge :</span>
              <span className="cs-prize">
                Free
                <div
                  style={{
                    textDecoration: "line-through",
                    textDecorationThickness: "2px",
                    textDecorationColor: "red",
                  }}
                >
                  $50
                </div>
              </span>
            </p>
            <p className="giftcard">
              <span>Giftcard/Discount code</span>
              <span className="cs-prize">-${discountCoupon}</span>
            </p>
            <div className="codeInput">
              <input
                type="text"
                name="couponCode"
                id="couponCode"
                placeholder="Coupon Code"
              />
              <button>Apply</button>
            </div>
            <p className="finalPrize">
              <span>Total</span>
              <span className="cs-prize">
                ${(total + total * 0.18).toFixed(2)}
              </span>
            </p>
          </div>
          <div className="checkoutInput">
            <button>CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartLayout;

{
  /* <section class="cart-containers">
      <div class="cart-container-1">
        <div class="cart-header">
          <h5 class="product-name p-10">Product</h5>
          <h5 class="size">Size</h5>
          <h5 class="price">Price</h5>
          <h5 class="quantity">Quantity</h5>
          <h5 class="total">Total Price</h5>
        </div>
        <hr />
        <section class="cart-items" style="height: 500px">
          <!--<div class="product">
            <h5 class="product-name"><img style="width: 120px;height: 128px;" src="./images/shoes/s1.svg" alt=""><span>NIKE AIR JORDON<br><button class="btn-cart1"><i class="remove fa-solid fa-trash"></i> Remove item</button> <button class="btn-cart1"><i class="fa-solid fa-heart"></i> Move to favorite</button></span></h5>
            <h5 class="size">11</h5>
            <h5 class="price">$548</h5>
            <h5 class="quantity">1</h5>
            <h5 class="total">$548</h5>
          </div><hr>-->
        </section>
      </div>
      <div
        class="cart-container-2"
        style="width: 30%; height: 500px; margin: auto"
      >
        <div class="summary">
          <h1>Order Summary</h1>
          <hr style="margin: 0 15px 15px" />
          <h2>Sub total <span class="summary-right">$00.00</span></h2>
          <h2>Tax<span class="summary-right">$00.00</span></h2>
          <h2>
            Shipping<span class="summary-right"
              >FREE
              <div
                style="
                  display: inline;
                  text-decoration: line-through;
                  text-decoration-color: red;
                  text-decoration-thickness: 2px;
                  margin-left: 3px;
                "
              >
                $50
              </div></span
            >
          </h2>
          <h2 class="giftcard">
            Giftcard/Discount code <span class="summary-right"></span
            ><br /><input type="text" class="codeinput" /><button
              class="codeapply"
              onclick="discount()"
            >
              Apply
            </button>
          </h2>
          <hr style="margin: 0 15px" />
          <h4>Total<span class="summary-right">$00.00</span></h4>
          <button class="checkout">CHECKOUT</button>
        </div>
      </div>
    </section> */
}
