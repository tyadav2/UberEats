const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);



// GET all users
router.get("/", async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Fix: Use `getUserProfile` instead of `updateProfile`
router.get("/profile", protect, getUserProfile); 

module.exports = router;
