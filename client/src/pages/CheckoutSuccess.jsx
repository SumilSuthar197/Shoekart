import React from "react";
import { Link } from "react-router-dom";
import successImage from "../Images/success-transaction.gif";
const CheckoutSuccess = () => {
  return (
    <section className="Error-cont">
      <div className="Error-div-center">
        <div className="img">
          <img
            src={successImage}
            alt="payment-success"
          />
        </div>
        <p className="Error-p1">Yay! Your payment is successful</p>
        <p className="Error-p2">
          Thank you for shopping with us. Your order will be delivered to your
          doorstep shortly. We hope you enjoy your purchase!
        </p>
        <Link
          to="/"
          className="Error-back-to-homepage"
          style={{ background: "#05D159", color: "#E8F6EA" }}
        >
          Back to homepage
        </Link>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
