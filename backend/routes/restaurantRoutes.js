const express = require("express");
const { registerRestaurant, loginRestaurant, updateRestaurantProfile, getRestaurantProfile } = require("../controllers/restaurantController");
const { protect } = require("../middleware/authMiddleware"); // ✅ Ensure correct import

const router = express.Router();

// Restaurant signup
router.post("/signup", registerRestaurant);

// Restaurant login
router.post("/login", loginRestaurant);

// Update profile route for restaurant (Requires authentication)
router.put("/profile", protect, updateRestaurantProfile); // ✅ Now properly working


router.get("/profile", protect, getRestaurantProfile);

module.exports = router;
