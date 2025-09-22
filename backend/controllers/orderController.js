// controllers/orderController.js

const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const OrderStatus = require("../models/OrderStatus");
const mongoose = require("mongoose");

//
// @desc Fetch all transactions with pagination, sorting, filtering
// @route GET /api/orders/transactions
// @access Private
//
const getAllTransactions = asyncHandler(async (req, res) => {
  let {
    page = 1,
    limit = 10,
    sort = "payment_time",
    order = "desc",
    status,
    school_id,
    startDate,
    endDate,
  } = req.query;

  page = Number(page);
  limit = Number(limit);

  // Filters
  const match = {};
  if (status) {
    const statusArr = status.split(",").map((s) => s.toUpperCase());
    match["orderStatus.status"] = { $in: statusArr };
  }
  if (school_id) {
    match["school_id"] = school_id;
  }
  if (startDate || endDate) {
    match["orderStatus.payment_time"] = {};
    if (startDate) match["orderStatus.payment_time"].$gte = new Date(startDate);
    if (endDate) match["orderStatus.payment_time"].$lte = new Date(endDate);
  }

  const sortOrder = order === "asc" ? 1 : -1;

  const pipeline = [
    {
      $lookup: {
        from: "orderstatuses",
        localField: "_id",
        foreignField: "collect_id",
        as: "orderStatus",
      },
    },
    { $unwind: "$orderStatus" },
    { $match: match },
    {
      $project: {
        collect_id: "$orderStatus.collect_id",
        school_id: "$school_id",
        student_name: "$student_info.name", // Added student name
        student_id: "$student_info.id", // Added student ID
        student_email: "$student_info.email", // Added student email
        gateway: "$gateway_name",
        order_amount: "$orderStatus.order_amount",
        transaction_amount: "$orderStatus.transaction_amount",
        status: "$orderStatus.status",
        custom_order_id: "$_id",
        payment_time: "$orderStatus.payment_time",
      },
    },
    {
      $facet: {
        metadata: [{ $count: "total" }],
        transactions: [
          { $sort: { [sort]: sortOrder } },
          { $skip: (page - 1) * limit },
          { $limit: limit },
        ],
      },
    },
  ];

  try {
    const results = await Order.aggregate(pipeline);

    const transactions = results[0].transactions || [];
    const totalCount = results[0].metadata[0]?.total || 0;

    res.json({
      transactions,
      page,
      pages: Math.ceil(totalCount / limit),
      total: totalCount,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500);
    throw new Error("Failed to fetch transactions");
  }
});

//
// @desc Fetch transactions by school
// @route GET /api/orders/school/:schoolId
// @access Private
//
const getTransactionsBySchool = asyncHandler(async (req, res) => {
  const { schoolId } = req.params;
  let { page = 1, limit = 10 } = req.query;

  page = Number(page);
  limit = Number(limit);

  const pipeline = [
    {
      $lookup: {
        from: "orderstatuses",
        localField: "_id",
        foreignField: "collect_id",
        as: "orderStatus",
      },
    },
    { $unwind: "$orderStatus" },
    { $match: { school_id: schoolId } },
    {
      $project: {
        collect_id: "$orderStatus.collect_id",
        school_id: "$school_id",
        student_name: "$student_info.name", // Added student name
        student_id: "$student_info.id", // Added student ID
        student_email: "$student_info.email", // Added student email
        gateway: "$gateway_name",
        order_amount: "$orderStatus.order_amount",
        transaction_amount: "$orderStatus.transaction_amount",
        status: "$orderStatus.status",
        custom_order_id: "$_id",
        payment_time: "$orderStatus.payment_time",
      },
    },
    {
      $facet: {
        metadata: [{ $count: "total" }],
        transactions: [
          { $sort: { payment_time: -1 } },
          { $skip: (page - 1) * limit },
          { $limit: limit },
        ],
      },
    },
  ];

  try {
    const results = await Order.aggregate(pipeline);

    const transactions = results[0].transactions || [];
    const totalCount = results[0].metadata[0]?.total || 0;

    res.json({
      transactions,
      page,
      pages: Math.ceil(totalCount / limit),
      total: totalCount,
    });
  } catch (error) {
    console.error("Error fetching school transactions:", error);
    res.status(500);
    throw new Error("Failed to fetch school transactions");
  }
});

//
// @desc Get transaction status
// @route GET /api/orders/status/:custom_order_id
// @access Private
//
const getTransactionStatus = asyncHandler(async (req, res) => {
  const { custom_order_id } = req.params;

  try {
    // Find the order first
    const order = await Order.findById(custom_order_id).populate({
      path: "orderStatus",
      model: "OrderStatus",
    });

    if (!order) {
      res.status(404);
      throw new Error("Transaction not found");
    }

    // Get the latest order status
    const orderStatus = await OrderStatus.findOne({
      collect_id: new mongoose.Types.ObjectId(custom_order_id),
    }).sort({ createdAt: -1 });

    if (!orderStatus) {
      res.status(404);
      throw new Error("Transaction status not found");
    }

    res.json({
      collect_id: orderStatus.collect_id,
      school_id: order.school_id,
      student_name: order.student_info.name,
      student_id: order.student_info.id,
      student_email: order.student_info.email,
      gateway: order.gateway_name,
      order_amount: orderStatus.order_amount,
      transaction_amount: orderStatus.transaction_amount,
      status: orderStatus.status,
      custom_order_id: order._id,
      payment_time: orderStatus.payment_time,
    });
  } catch (error) {
    console.error("Error fetching transaction status:", error);
    res.status(500);
    throw new Error("Failed to fetch transaction status");
  }
});

module.exports = {
  getAllTransactions,
  getTransactionsBySchool,
  getTransactionStatus,
};
