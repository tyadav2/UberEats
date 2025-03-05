const Restaurant = require("../models/Restaurant");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Restaurant signup
exports.registerRestaurant = async (req, res) => {
    const { name, email, password, location, description, businessHours, cuisine } = req.body;

    console.log("Received Signup Data:", req.body);

    try {
        // Ensure all required fields are present
        if (!name || !email || !password || !location || !description || !businessHours || !cuisine) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const restaurant = await Restaurant.create({ 
            name, 
            email, 
            password: hashedPassword, 
            location, 
            description, 
            businessHours, 
            cuisine 
        });

        res.status(201).json({ message: "Restaurant registered successfully", restaurant });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(400).json({ error: error.message });
    }
};

// Restaurant login
exports.loginRestaurant = async (req, res) => {
    const { email, password } = req.body;
    try {
        const restaurant = await Restaurant.findOne({ where: { email } });
        if (!restaurant) return res.status(400).json({ message: "Restaurant not found" });

        const isMatch = await bcrypt.compare(password, restaurant.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate token
        const token = jwt.sign({ id: restaurant.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // ✅ Send restaurant details along with the token
        res.json({
            message: "Restaurant logged in",
            token,
            restaurant: {
                id: restaurant.id,
                name: restaurant.name,
                email: restaurant.email,
                location: restaurant.location,
                description: restaurant.description,
                businessHours: restaurant.businessHours,
                cuisine: restaurant.cuisine,
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRestaurantProfile = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.restaurant.id);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ message: "Error fetching restaurant profile" });
    }
};


exports.updateRestaurantProfile = async (req, res) => {
  try {
      if (!req.restaurant) {
          return res.status(401).json({ message: "Not authorized, token failed" });
      }

      const restaurant = await Restaurant.findByPk(req.restaurant.id);

      if (!restaurant) {
          return res.status(404).json({ message: "Restaurant not found" });
      }

      restaurant.name = req.body.name || restaurant.name;
      restaurant.email = req.body.email || restaurant.email;
      restaurant.location = req.body.location || restaurant.location;
      restaurant.description = req.body.description || restaurant.description;
      restaurant.businessHours = req.body.businessHours || restaurant.businessHours;
      restaurant.cuisine = req.body.cuisine || restaurant.cuisine;

      await restaurant.save();

      res.json({ message: "Profile updated successfully", restaurant });
  } catch (error) {
      console.error("Update Profile Error:", error);
      res.status(500).json({ message: "Server error" });
  }
};
