const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

// GET all restaurants
router.get("/", async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.json(restaurants);
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
