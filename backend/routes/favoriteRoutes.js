const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { addFavorite, getFavorites, removeFavorite } = require("../controllers/favoriteController");

// Route to add a favorite (customer only)
router.post("/", protect, addFavorite);

// Route to get all favorite restaurants for the customer
router.get("/", protect, getFavorites);

// Route to remove a favorite restaurant
router.delete("/:restaurantId", protect, removeFavorite);

module.exports = router;
