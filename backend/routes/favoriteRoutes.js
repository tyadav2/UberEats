const express = require('express');
const router = express.Router();
const { Restaurant } = require('../models/Restaurant');
const { Favorite } = require('../models/Favorite');
const {protect} = require('../middleware/authMiddleware');

// Add a restaurant to favorites
router.post('/', protect, async (req, res) => {
    try {
        const { restaurantId } = req.body;
        const userId = req.user.id;
        
        const favorite = await Favorite.create({ userId, restaurantId });
        res.status(201).json(favorite);
    } catch (error) {
        res.status(500).json({ error: 'Could not add favorite' });
    }
});

// Remove a restaurant from favorites
router.delete('/:restaurantId', protect, async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const userId = req.user.id;
        
        await Favorite.destroy({ where: { userId, restaurantId } });
        res.status(200).json({ message: 'Favorite removed' });
    } catch (error) {
        res.status(500).json({ error: 'Could not remove favorite' });
    }
});

// Get all favorite restaurants for a user
router.get('/', protect, async (req, res) => {
    try {
        const userId = req.user.id;
        const favorites = await Favorite.findAll({ where: { userId }, include: [Restaurant] });
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch favorites' });
    }
});

module.exports = router;