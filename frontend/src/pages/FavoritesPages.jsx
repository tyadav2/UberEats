// Frontend - Favorites Page (pages/FavoritesPage.jsx)
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/favorites')
            .then(response => setFavorites(response.data))
            .catch(error => console.error('Error fetching favorites:', error));
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Favorite Restaurants</h1>
            {favorites.length === 0 ? (
                <p>No favorite restaurants added yet.</p>
            ) : (
                <ul>
                    {favorites.map((fav) => (
                        <li 
                            key={fav.id} 
                            className="mb-2 p-4 border rounded cursor-pointer" 
                            onClick={() => navigate(`/restaurant/${fav.restaurantId}`)}
                        >
                            {fav.Restaurant.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FavoritesPage;