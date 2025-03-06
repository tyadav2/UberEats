const Order = require("../models/Order");

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};

exports.createOrder = async (req, res) => {
    try {
        const { restaurantId, customerId, items, totalAmount } = req.body;
        const newOrder = await Order.create({ restaurantId, customerId, items, totalAmount });
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
};

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

exports.getUserOrders = async (req, res) => {
    try {
      // Ensure the requester is a customer
      if (!req.user) {
        return res.status(403).json({ message: "Access denied: Not a customer" });
      }
      
      // Fetch orders for the logged-in user, sorted by creation date (most recent first)
      const orders = await Order.findAll({
        where: { userId: req.user.id },
        order: [['createdAt', 'DESC']],
      });
  
      if (!orders.length) {
        return res.status(404).json({ message: "No orders found" });
      }
      
      res.json(orders);
    } catch (error) {
      console.error("Error fetching user order history:", error);
      res.status(500).json({ message: "Server error" });
    }
  };


    exports.getRestaurantOrders = async (req, res) => {
        try {
        // Ensure the requester is an authenticated restaurant
        if (!req.restaurant) {
            return res.status(403).json({ message: "Access denied: Not a restaurant" });
        }
    
        // Build the filter object for the query
        const filter = { restaurantId: req.restaurant.id };
    
        // If a status query parameter is provided, add it to the filter
        if (req.query.status) {
            filter.status = req.query.status;
        }
    
        // Retrieve orders for this restaurant, optionally filtered by status,
        // and sort by creation date (most recent first)
        const orders = await Order.findAll({
            where: filter,
            order: [["createdAt", "DESC"]],
        });
    
        if (!orders.length) {
            return res.status(404).json({ message: "No orders found" });
        }
        
        res.json(orders);
        } catch (error) {
        console.error("Error fetching restaurant orders:", error);
        res.status(500).json({ message: "Server error" });
        }
    };
  
  
