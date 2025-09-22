const express = require("express");
const { webhookHandler } = require("../controllers/webhookController");
const router = express.Router();

// Use raw body parser for Stripe Webhook
router.post("/", express.raw({ type: "application/json" }), webhookHandler);

module.exports = router;
