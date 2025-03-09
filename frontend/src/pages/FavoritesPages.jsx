import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import DashboardNavbar from '../components/DashboardNavbar';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/favorites', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            });
            setFavorites(response.data);
        } catch (error) {
            console.error('Error fetching favorites:', error);
            if (error.response && error.response.status === 401) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const removeFavorite = async (restaurantId) => {
        try {
            await axios.delete(`http://localhost:5000/api/favorites/${restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('restaurantToken')}`
                }
            });
            // Update state to remove the unfavorited restaurant
            setFavorites(favorites.filter(restaurant => restaurant.id !== restaurantId));
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl">Loading favorites...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <DashboardNavbar />
            
            <div className="container mx-auto p-4 pt-24">
                <h1 className="text-2xl font-bold mb-6">My Favorite Restaurants</h1>
                
                {favorites.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                        <p className="text-lg text-gray-600">You haven't added any favorite restaurants yet.</p>
                        <button 
                            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                            onClick={() => navigate('/dashboard')}
                        >
                            Browse Restaurants
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {favorites.map((restaurant) => (
                            <div 
                                key={restaurant.id} 
                                className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                            >
                                <div 
                                    className="cursor-pointer"
                                    onClick={() => navigate(`/restaurants/${restaurant.id}`)}
                                >
                                    <img 
                                        src={restaurant.image_url || 'https://via.placeholder.com/300'} 
                                        alt={restaurant.name}
                                        className="w-full h-44 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-medium">{restaurant.name}</h3>
                                        <p className="text-gray-600">{restaurant.category}</p>
                                        {restaurant.rating && (
                                            <div className="mt-2 text-sm font-semibold">
                                                Rating: {restaurant.rating}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <button 
                                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md z-10"
                                    onClick={() => removeFavorite(restaurant.id)}
                                    title="Remove from favorites"
                                >
                                    <FaHeart className="text-red-500 text-xl" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;