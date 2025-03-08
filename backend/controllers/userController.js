const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
      const user = await User.findByPk(req.user.id);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: "Error fetching user profile" });
  }
};

// PUT update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Ensure user is authenticated
    const { name, city, state, country, phoneNumber, dob } = req.body;
    let profilePicUrl = null;

    // If profile picture is uploaded, store its URL
    if (req.file) {
      profilePicUrl = `/uploads/${req.file.filename}`;
    }

    // Find user and update
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.update({
      name: name || user.name,
      city: city || user.city,
      state: state || user.state,
      country: country || user.country,
      phoneNumber: phoneNumber || user.phoneNumber,
      dob: dob || user.dob,
      profilePic: profilePicUrl || user.profilePic,
    });

    res.json({ message: "Profile updated successfully", user });

  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};