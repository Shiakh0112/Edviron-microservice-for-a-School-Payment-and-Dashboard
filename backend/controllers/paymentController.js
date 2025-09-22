// controllers/paymentController.js

const asyncHandler = require("express-async-handler");
const Stripe = require("stripe");
const Order = require("../models/Order");
const OrderStatus = require("../models/OrderStatus");
const { v4: uuidv4 } = require("uuid");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createPayment = asyncHandler(async (req, res) => {
  const { school_id, amount, student_info } = req.body;

  if (!school_id || !amount || !student_info) {
    res.status(400);
    throw new Error("Missing required fields");
  }

  const custom_order_id = uuidv4();

  const order = await Order.create({
    school_id,
    student_info,
    custom_order_id,
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Convert to paise
    currency: "inr",
    metadata: { order_id: order._id.toString() },
  });

  order.stripe_payment_intent_id = paymentIntent.id;
  await order.save();

  const orderStatus = await OrderStatus.create({
    collect_id: order._id,
    order_amount: amount,
    status: "PENDING",
  });

  // Add the orderStatus reference to the Order
  order.orderStatus.push(orderStatus._id);
  await order.save();

  res.json({
    clientSecret: paymentIntent.client_secret,
    orderId: order._id,
  });
});

const checkPaymentStatus = asyncHandler(async (req, res) => {
  const { order_id } = req.params;

  const orderStatus = await OrderStatus.findOne({ collect_id: order_id });
  if (!orderStatus) {
    res.status(404);
    throw new Error("Order status not found");
  }

  res.json({ status: orderStatus.status });
});

module.exports = { createPayment, checkPaymentStatus };
