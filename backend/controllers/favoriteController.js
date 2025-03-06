// controllers/favoriteController.js
const Favorite = require("../models/Favorite");
const Restaurant = require("../models/Restaurant");

// Add a restaurant to favorites
exports.addFavorite = async (req, res) => {
  try {
    // Ensure that the requester is a customer
    if (!req.user) {
      return res.status(403).json({ message: "Only customers can mark favorites" });
    }
    
    const { restaurantId } = req.body;
    
    // Validate restaurant existence
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    
    // Check if the restaurant is already marked as favorite
    const existing = await Favorite.findOne({
      where: { userId: req.user.id, restaurantId }
    });
    if (existing) {
      return res.status(400).json({ message: "Restaurant already marked as favorite" });
    }
    
    const favorite = await Favorite.create({
      userId: req.user.id,
      restaurantId,
    });
    
    res.status(201).json({ message: "Restaurant added to favorites", favorite });
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a customer's favorite restaurants
exports.getFavorites = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(403).json({ message: "Only customers can view favorites" });
    }
    
    const favorites = await Favorite.findAll({
      where: { userId: req.user.id },
    });
    
    // Optionally, fetch the full restaurant details for each favorite
    const favoriteRestaurants = await Promise.all(
      favorites.map(async (fav) => {
        const restaurant = await Restaurant.findByPk(fav.restaurantId);
        return restaurant;
      })
    );
    
    res.json(favoriteRestaurants);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove a restaurant from favorites
exports.removeFavorite = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(403).json({ message: "Only customers can remove favorites" });
    }
    
    const { restaurantId } = req.params;
    
    const favorite = await Favorite.findOne({
      where: { userId: req.user.id, restaurantId }
    });
    
    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }
    
    await favorite.destroy();
    res.json({ message: "Restaurant removed from favorites" });
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ message: "Server error" });
  }
};
