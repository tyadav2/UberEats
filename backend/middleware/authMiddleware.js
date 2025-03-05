const jwt = require("jsonwebtoken");
const Restaurant = require("../models/Restaurant");

const protect = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Unauthorized access, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.restaurant = await Restaurant.findByPk(decoded.id); // ✅ Attach restaurant info
        if (!req.restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = { protect }; // ✅ Export as an object so it can be used as { protect }