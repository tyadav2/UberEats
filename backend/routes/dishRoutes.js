// routes/dishRoutes.js
const express = require("express");
const router = express.Router();
const { addDish, updateDish, deleteDish, getDishes } = require("../controllers/dishController");
const { getAllDishes } = require("../controllers/dishController");
const { protect } = require("../middleware/authMiddleware");

// Route to add a new dish
router.post("/", protect, addDish);

// Update an existing dish (Restaurant Only)
router.put("/:id", protect, updateDish);

// Delete a dish (Restaurant Only)
router.delete("/:id", protect, deleteDish);

// Get dishes - if authenticated as restaurant, get only its dishes; else, get all dishes
router.get("/", protect, getDishes);

// Public route to get all dishes (no token required)
router.get("/public", getAllDishes);

module.exports = router;
