const express = require('express');
const { getAllTransactions, getTransactionsBySchool, getTransactionStatus } = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/transactions', getAllTransactions);
router.get('/school/:schoolId', getTransactionsBySchool);
router.get('/status/:custom_order_id', getTransactionStatus);

module.exports = router;