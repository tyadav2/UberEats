const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");

const protect = async (req, res, next) => {
    let token = req.header("Authorization");

    // Check if token is provided and starts with "Bearer "
    if (token && token.startsWith("Bearer ")) {
        token = token.split(" ")[1]; // Extract token without "Bearer "
    }

    if (!token) {
        return res.status(401).json({ message: "Unauthorized access, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the token belongs to a User or a Restaurant
        const user = await User.findByPk(decoded.id);
        const restaurant = await Restaurant.findByPk(decoded.id);

        if (user) {
            req.user = user; // Attach user info
        } else if (restaurant) {
            req.restaurant = restaurant; // Attach restaurant info
        } else {
            return res.status(404).json({ message: "User or Restaurant not found" });
        }

        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};

const protectOrderAccess = async (req, res, next) => {
    const { user, restaurant } = req;

    if (!user && !restaurant) {
        return res.status(403).json({ message: "Unauthorized access" });
    }

    next();
};

module.exports = { protect, protectOrderAccess };
