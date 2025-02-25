const Order = require("../models/Order");

/*exports.placeOrder = async (req, res) => {
  const { restaurantId, totalAmount } = req.body;
  try {
    const order = await Order.create({ userId: req.user.id, restaurantId, totalAmount });
    res.status(201).json({ message: "Order placed", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};*/

exports.placeOrder = async (req, res) => {
    const { restaurantId, totalAmount } = req.body;
  
    try {
      const order = await Order.create({
        userId: 1, // Hardcoded userId for now
        restaurantId,
        totalAmount,
      });
  
      res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  


exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.user.id } });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
