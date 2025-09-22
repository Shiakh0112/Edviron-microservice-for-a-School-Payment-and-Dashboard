const express = require("express");
const {
  createPayment,
  checkPaymentStatus,
} = require("../controllers/paymentController");
const router = express.Router();

router.post("/create-payment", createPayment);
router.get("/status/:order_id", checkPaymentStatus);

module.exports = router;
