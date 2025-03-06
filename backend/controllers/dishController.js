// controllers/dishController.js
const Dish = require("../models/Dish");

exports.addDish = async (req, res) => {
  try {
    const { name, ingredients, image, price, description, category,  } = req.body;
    if (!name || !price || !category ) {
      return res.status(400).json({ message: "Name, price, and category are required" });
    }
    
    const restaurantId = req.restaurant ? req.restaurant.id : null;
    if (!restaurantId) {
      return res.status(401).json({ message: "Unauthorized: No restaurant identified" });
    }
    
    const dish = await Dish.create({
      name,
      ingredients,
      image,
      price,
      description,
      category,
      restaurantId,
    });
    
    res.status(201).json({ message: "Dish added successfully", dish });
  } catch (error) {
    console.error("Error adding dish:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateDish = async (req, res) => {
    try {
      const dishId = req.params.id;
      const { name, ingredients, image, price, description, category } = req.body;
      
      // Find the dish by its primary key
      const dish = await Dish.findByPk(dishId);
      if (!dish) {
        return res.status(404).json({ message: "Dish not found" });
      }
      
      // Ensure that the dish belongs to the logged-in restaurant
      if (dish.restaurantId !== req.restaurant.id) {
        return res.status(403).json({ message: "You are not authorized to update this dish" });
      }
      
      // Update the dish fields (if provided)
      dish.name = name || dish.name;
      dish.ingredients = ingredients || dish.ingredients;
      dish.image = image || dish.image;
      dish.price = price || dish.price;
      dish.description = description || dish.description;
      dish.category = category || dish.category;
      
      // Save the updated dish
      await dish.save();
      
      res.json({ message: "Dish updated successfully", dish });
    } catch (error) {
      console.error("Error updating dish:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  exports.deleteDish = async (req, res) => {
    try {
      const dishId = req.params.id;
      const dish = await Dish.findByPk(dishId);
      
      if (!dish) {
        return res.status(404).json({ message: "Dish not found" });
      }
      
      // Check if the dish belongs to the logged-in restaurant
      if (dish.restaurantId !== req.restaurant.id) {
        return res.status(403).json({ message: "You are not authorized to delete this dish" });
      }
      
      // Delete the dish
      await dish.destroy();
      
      res.json({ message: "Dish deleted successfully" });
    } catch (error) {
      console.error("Error deleting dish:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  // Only for authenticated restaurants:
exports.getDishes = async (req, res) => {
    try {
      const dishes = await Dish.findAll({ where: { restaurantId: req.restaurant.id } });
      return res.json(dishes);
    } catch (error) {
      console.error("Error fetching dishes:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  // For public access:
  exports.getAllDishes = async (req, res) => {
    try {
      const dishes = await Dish.findAll();
      return res.json(dishes);
    } catch (error) {
      console.error("Error fetching dishes:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  
  
  
  
