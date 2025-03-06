const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");

// ✅ Place a new order (User Only)
router.post("/", protect, async (req, res) => {
    try {
        const { restaurantId, totalAmount, items, paymentMethod } = req.body;

        if (!req.user) {
            return res.status(403).json({ error: "Only users can place orders" });
        }

        // Validate restaurant existence
        const restaurant = await Restaurant.findByPk(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        const newOrder = await Order.create({
            userId: req.user.id,
            userEmail: req.user.email,
            restaurantId,
            restaurantName: restaurant.name,
            totalAmount,
            status: "Pending",
            estimatedDeliveryTime: "30 min",
            paymentMethod,
            items
        });

        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Get all orders for a user or restaurant
router.get("/", protect, async (req, res) => {
    try {
        let orders;

        if (req.user) {
            // Fetch orders for the logged-in user
            orders = await Order.findAll({ where: { userId: req.user.id } });
        } else if (req.restaurant) {
            // Fetch orders for the logged-in restaurant
            orders = await Order.findAll({ where: { restaurantId: req.restaurant.id } });
        } else {
            return res.status(403).json({ error: "Unauthorized access" });
        }

        if (!orders.length) {
            return res.status(404).json({ message: "No orders found" });
        }

        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Update order status (Restaurant Only)
router.put("/:orderId", protect, async (req, res) => {
    try {
        if (!req.restaurant) {
            return res.status(403).json({ error: "Only restaurants can update orders" });
        }

        const { orderId } = req.params;
        const { status } = req.body;

        const order = await Order.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        // Ensure restaurant can only update its own orders
        if (order.restaurantId !== req.restaurant.id) {
            return res.status(403).json({ error: "You can only update orders for your restaurant" });
        }

        order.status = status;
        await order.save();

        res.json({ message: "Order status updated successfully", order });
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
