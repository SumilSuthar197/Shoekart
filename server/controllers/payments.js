require("dotenv").config();
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const Stripe = require("stripe");
const order = require("../models/order");
const user = require("../models/user");
const product = require("../models/product");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const checkout = asyncErrorHandler(async (req, res) => {
  const id = req.tokenId;
  const email = req.tokenEmail;
  const { coupon } = req.body;

  const cartObj = await user
    .findById(id)
    .populate({
      path: "cart.items.productId",
      select: "name price image brand sizeQuantity",
    })
    .select("cart name");

  const formattedCart = cartObj.cart.items.map((item) => {
    const sizeQty = item.productId.sizeQuantity.filter(
      (size) => size.size === item.size
    )[0].quantity;
    return {
      productId: item.productId._id,
      name: `${item.productId.brand} ${item.productId.name}`,
      image: item.productId.image,
      qty: item.qty > sizeQty ? sizeQty : item.qty,
      size: item.size,
      price: item.productId.price,
    };
  });
  let customer;

  const existingCustomer = await stripe.customers.list({ email: email });
  if (existingCustomer.data.length > 0) {
    customer = existingCustomer.data[0];
  } else {
    customer = await stripe.customers.create({
      name: cartObj.name,
      email: email,
      metadata: { userId: id },
    });
  }

  const line_items = formattedCart.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          images: [item.image],
          description: `size: ${item.size}`,
          metadata: {
            productId: item.productId.toString(),
            size: item.size.toString(),
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.qty,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    phone_number_collection: { enabled: true },
    billing_address_collection: "required",
    shipping_address_collection: {},
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "inr" },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 5 },
            maximum: { unit: "business_day", value: 7 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 30000, currency: "inr" },
          display_name: "Next day air",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 1 },
            maximum: { unit: "business_day", value: 1 },
          },
        },
      },
    ],
    mode: "payment",
    metadata: {
      cart: JSON.stringify(
        formattedCart.map((item) => {
          return {
            productId: item.productId,
            qty: item.qty,
            size: item.size,
          };
        })
      ),
    },
    customer: customer.id,
    discounts: coupon !== "" ? [{ coupon }] : [],
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });
  res.json({ url: session.url });
});

const createOrder = async (customer, data) => {
  try {
    const products = JSON.parse(data.metadata.cart);

    await order.create({
      userId: customer.metadata.userId,
      paymentIntentId: data.payment_intent,
      products,
      subtotal: data.amount_subtotal / 100,
      total: data.amount_total / 100,
      shipping: data.customer_details,
      payment_status: data.payment_status,
    });

    const userObj = await user.findById(customer.metadata.userId);
    userObj.cart.items = [];
    userObj.cart.totalPrice = 0;
    await userObj.save();

    for (const item of products) {
      const productObj = await product.findById(item.productId);
      productObj.sizeQuantity = productObj.sizeQuantity.filter((size) => {
        if (size.size === item.size) {
          size.quantity -= item.quantity;
        }
        return size.quantity > 0;
      });
      await productObj.save();
    }
    console.log("Order created successfully");
  } catch (err) {
    console.log(err);
  }
};

const webhook = asyncErrorHandler((request, response) => {
  let data;
  let eventType;
  let endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (endpointSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    const sig = request.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err);
      return response.sendStatus(400);
    }
    data = event.data.object;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = request.body.data.object;
    eventType = request.body.type;
  }
  switch (eventType) {
    case "checkout.session.completed":
      stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {
          createOrder(customer, data);
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
      break;
    default:
      // console.log(`Unhandled event type ${eventType}`);
      break;
  }
  response.status(200).send();
});
module.exports = { checkout, webhook };
