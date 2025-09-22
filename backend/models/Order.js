// models/Order.js
const mongoose = require("mongoose");

const studentInfoSchema = mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

const orderSchema = mongoose.Schema(
  {
    school_id: { type: String, required: true },
    student_info: { type: studentInfoSchema, required: true },
    custom_order_id: { type: String, required: true, unique: true },
    stripe_payment_intent_id: { type: String },
    gateway_name: { type: String, default: "stripe" },
    orderStatus: [
      {
        // Added this field
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderStatus",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
