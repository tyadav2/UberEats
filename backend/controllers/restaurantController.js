const Restaurant = require("../models/Restaurant");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Restaurant signup
exports.registerRestaurant = async (req, res) => {
    const {
        name,
        cuisine,
        category,
        location,
        address,
        phone_number,
        email,
        password,
        description,
        business_hours,
        price_range,
        delivery_time,
        image_url,
        rating,
        is_open
    } = req.body;

    console.log("Received Signup Data:", req.body);

    try {
        if (
            !name ||
            !cuisine ||
            !category ||
            !location ||
            !address ||
            !phone_number ||
            !email ||
            !password ||
            !description ||
            !business_hours ||
            !price_range ||
            !delivery_time
        ) {
            return res.status(400).json({ message: "All required fields must be provided!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Use provided rating and is_open or default to 0.0 and true respectively
        const ratingValue = rating !== undefined ? rating : 0.0;
        const isOpenValue = is_open !== undefined ? is_open : true;

        const restaurant = await Restaurant.create({
            name,
            cuisine,
            category,
            location,
            address,
            phone_number,
            email,
            password: hashedPassword,
            description,
            business_hours,
            price_range,
            delivery_time,
            image_url: image_url || null,
            rating: ratingValue,
            is_open: isOpenValue
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

        res.json({
            message: "Restaurant logged in",
            token,
            restaurant: {
                id: restaurant.id,
                name: restaurant.name,
                cuisine: restaurant.cuisine,
                category: restaurant.category,
                location: restaurant.location,
                address: restaurant.address,
                phone_number: restaurant.phone_number,
                email: restaurant.email,
                description: restaurant.description,
                business_hours: restaurant.business_hours,
                rating: restaurant.rating,
                image_url: restaurant.image_url,
                price_range: restaurant.price_range,
                delivery_time: restaurant.delivery_time,
                is_open: restaurant.is_open,
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Restaurant Profile
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

// Update Restaurant Profile
exports.updateRestaurantProfile = async (req, res) => {
    try {
        if (!req.restaurant) {
            return res.status(401).json({ message: "Not authorized, token failed" });
        }

        const restaurant = await Restaurant.findByPk(req.restaurant.id);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        // Update fields if provided; if not, keep the existing values
        restaurant.name = req.body.name || restaurant.name;
        restaurant.cuisine = req.body.cuisine || restaurant.cuisine;
        restaurant.category = req.body.category || restaurant.category;
        restaurant.location = req.body.location || restaurant.location;
        restaurant.address = req.body.address || restaurant.address;
        restaurant.phone_number = req.body.phone_number || restaurant.phone_number;
        restaurant.email = req.body.email || restaurant.email;
        restaurant.description = req.body.description || restaurant.description;
        restaurant.business_hours = req.body.business_hours || restaurant.business_hours;
        restaurant.price_range = req.body.price_range || restaurant.price_range;
        restaurant.delivery_time = req.body.delivery_time || restaurant.delivery_time;
        restaurant.image_url = req.body.image_url || restaurant.image_url;

        // Optionally update rating and is_open if provided
        if (req.body.rating !== undefined) {
            restaurant.rating = req.body.rating;
        }
        if (req.body.is_open !== undefined) {
            restaurant.is_open = req.body.is_open;
        }

        await restaurant.save();

        res.json({ message: "Profile updated successfully", restaurant });
    } catch (error) {
        console.error("Update Profile Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getRestaurantById = async (req, res) => {
    try {
        console.log("Fetching restaurant with ID:", req.params.id);  // ✅ Debugging log

        const restaurant = await Restaurant.findByPk(req.params.id);  // ✅ Fix: Use findByPk()

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        res.json(restaurant);
    } catch (error) {
        console.error("❌ Error fetching restaurant:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

