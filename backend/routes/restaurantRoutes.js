const express = require("express");
const { getAllRestaurants } = require("../controllers/restaurantController");

const router = express.Router();

router.get("/", getAllRestaurants);

module.exports = router;
