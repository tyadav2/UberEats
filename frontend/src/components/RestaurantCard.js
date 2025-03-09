import React, { useState } from 'react';
import axios from 'axios';

const RestaurantCard = ({ restaurant }) => {
    const [isFavorite, setIsFavorite] = useState(restaurant.isFavorite);

    const toggleFavorite = async () => {
        try {
            if (isFavorite) {
                await axios.delete(`/api/favorites/${restaurant.id}`);
            } else {
                await axios.post('/api/favorites', { restaurantId: restaurant.id });
            }
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Error updating favorite status:', error);
        }
    };

    return (
        <div className="border rounded p-4 shadow-md">
            <h2 className="text-xl font-bold">{restaurant.name}</h2>
            <p>{restaurant.description}</p>
            <button 
                className={`mt-2 p-2 rounded ${isFavorite ? 'bg-red-500' : 'bg-gray-300'}`} 
                onClick={toggleFavorite}>
                {isFavorite ? 'Unfavorite' : 'Favorite'}
            </button>
        </div>
    );
};

export default RestaurantCard;