const express = require("express");
const { placeOrder, getUserOrders } = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/place", placeOrder); //add protect
router.get("/my-orders", protect, getUserOrders);

module.exports = router;
