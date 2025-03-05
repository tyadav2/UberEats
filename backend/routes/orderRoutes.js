const express = require("express");
const { getOrders, createOrder, updateOrderStatus } = require("../controllers/orderController"); // ✅ Ensure correct imports

const router = express.Router();

// ✅ Ensure these functions exist in orderController.js
router.get("/", getOrders);
router.post("/", createOrder);
router.put("/:orderId/status", updateOrderStatus);

module.exports = router;
