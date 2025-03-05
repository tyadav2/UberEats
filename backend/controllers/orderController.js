const Order = require("../models/Order");

// ✅ Ensure getOrders function is defined
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};

// ✅ Ensure createOrder function is defined
exports.createOrder = async (req, res) => {
    try {
        const { restaurantId, customerId, items, totalAmount } = req.body;
        const newOrder = await Order.create({ restaurantId, customerId, items, totalAmount });
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
};

// ✅ Ensure updateOrderStatus function is defined
exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await Order.findByPk(orderId);
        if (!order) return res.status(404).json({ message: "Order not found" });

        order.status = status;
        await order.save();

        res.json({ message: "Order status updated", order });
    } catch (error) {
        res.status(500).json({ message: "Error updating order status", error });
    }
};
