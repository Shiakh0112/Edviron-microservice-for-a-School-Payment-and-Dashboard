const asyncHandler = require("express-async-handler");
const OrderStatus = require("../models/OrderStatus");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const webhookHandler = asyncHandler(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = "your_stripe_webhook_secret"; // Set this from Stripe Dashboard

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;

    const orderStatus = await OrderStatus.findOne({
      collect_id: paymentIntent.metadata.order_id,
    });
    if (orderStatus) {
      orderStatus.status = "SUCCESS";
      orderStatus.payment_time = new Date();
      await orderStatus.save();
    }
  }

  res.json({ received: true });
});

module.exports = { webhookHandler };
