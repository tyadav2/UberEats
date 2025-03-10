const Order = require("../models/Order");
const Dish = require("../models/Dish");
const Restaurant = require("../models/Restaurant");

// 🚀 Get Orders for Logged-in Customer
exports.getUserOrders = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(403).json({ message: "Access denied: Not a customer" });
        }

        const orders = await Order.findAll({
            where: { userId: req.user.id },
            order: [['createdAt', 'DESC']],
        });

        if (!orders.length) {
            return res.status(404).json({ message: "No orders found" });
        }


                const enrichedOrders = await Promise.all(
                    orders.map(async (order) => {
                        const orderData = order.toJSON();
                        const itemsWithNames = await Promise.all(
                            orderData.items.map(async (item) => {
                                const dish = await Dish.findByPk(item.dishId);
                                return {
                                    dishId: item.dishId,
                                    dishName: dish ? dish.name : "Unknown Dish",
                                    quantity: item.quantity,
                                };
                            })
                        );

                return {
                    ...order.toJSON(),
                    items: itemsWithNames, // ✅ Update items with dish names
                };
            })
        );

        res.json(enrichedOrders);
    } catch (error) {
        console.error("Error fetching user order history:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// 🚀 Get Orders for a Restaurant
exports.getRestaurantOrders = async (req, res) => {
    try {
        if (!req.restaurant) {
            return res.status(403).json({ message: "Access denied: Not a restaurant" });
        }

        const filter = { restaurantId: req.restaurant.id };
        if (req.query.status) filter.status = req.query.status;

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

// 🚀 Create a New Order
exports.createOrder = async (req, res) => {
    try {
      console.log("1. Starting order creation");
      console.log("2. Request body:", req.body);
      console.log("3. User info:", req.user);
  
      const { restaurantId, totalAmount, items, paymentMethod, deliveryAddress } = req.body;
      console.log("4. Destructured data:", { restaurantId, totalAmount, items, paymentMethod, deliveryAddress });
  
      const restaurant = await Restaurant.findByPk(restaurantId);
      console.log("5. Found restaurant:", restaurant);
  
      const itemsWithNames = await Promise.all(
        items.map(async (item) => {
          const dish = await Dish.findByPk(item.dishId);
          console.log(`6. Found dish for id ${item.dishId}:`, dish);
          return {
            dishId: item.dishId,
            dishName: dish ? dish.name : "Unknown Dish",
            quantity: item.quantity
          };
        })
      );
      console.log("7. Items with names:", itemsWithNames);
  
      const orderData = {
        userId: req.user.id,
        userEmail: req.user.email,
        restaurantId,
        restaurantName: restaurant.name,
        totalAmount,
        status: "New",
        estimatedDeliveryTime: "30 min",
        paymentMethod,
        items: itemsWithNames,
        deliveryAddress
      };
      console.log("8. Order data to be created:", orderData);
  
      const newOrder = await Order.create(orderData);
      console.log("9. New order created:", newOrder);
  
      res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
      console.error("Error in order creation:", error);
      res.status(500).json({ error: error.message });
    }
  };
  


// 🚀 Update Order Status (Restaurant Only)
exports.updateOrderStatus = async (req, res) => {
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

        order.status = status;
        await order.save();

        res.json({ message: "Order status updated successfully", order });
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// 🚀 Cancel an Order
exports.cancelOrder = async (req, res) => {
  try {
      const { orderId } = req.params;
      const order = await Order.findByPk(orderId);

      // Check if the order exists
      if (!order) {
          return res.status(404).json({ message: "Order not found" });
      }

      // Ensure only the customer who placed the order can cancel it
      if (order.userId !== req.user.id) {
          return res.status(403).json({ message: "Unauthorized: You can only cancel your own orders." });
      }

      // Only allow canceling if status is "Pending" or "Preparing"
      if (order.status !== "Pending" && order.status !== "Preparing") {
          return res.status(400).json({ message: "Order cannot be canceled once delivered." });
      }

      // ✅ Update order status to "Cancelled"
      await order.update({ status: "Cancelled" });

      res.json({ message: "Order cancelled successfully" });
  } catch (error) {
      console.error("Error canceling order:", error);
      res.status(500).json({ message: "Server error" });
  }
};

