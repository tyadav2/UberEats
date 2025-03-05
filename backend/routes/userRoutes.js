const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);

// ✅ Fix: Use `getUserProfile` instead of `updateProfile`
router.get("/profile", protect, getUserProfile); 

module.exports = router;
