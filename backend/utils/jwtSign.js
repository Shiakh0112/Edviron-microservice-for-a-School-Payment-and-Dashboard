const jwt = require('jsonwebtoken');

const signPaymentPayload = (payload) => {
  return jwt.sign(payload, process.env.PG_KEY, { algorithm: 'HS256' });
};

module.exports = { signPaymentPayload };