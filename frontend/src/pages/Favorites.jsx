import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DashboardNavbar from '../components/DashboardNavbar';

function Favorites() {
  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("customerToken")); 

      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await axios.get("http://localhost:5000/api/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  return (
    <div className="favorites-container">
      <DashboardNavbar />
      
      <h2 className="text-2xl font-bold text-center my-6">Your Favorite Restaurants</h2>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No favorites yet. ❤️</p>
        ) : (
          favorites.map((fav) => (
            <div key={fav.id} className="relative bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 ease-in-out">
              
              {/* Restaurant Image */}
              <div className="relative w-full h-44">
                <img
                  src={fav.image_url || 'https://via.placeholder.com/300'}
                  alt={fav.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Rating Badge */}
              <div className="absolute bottom-3 right-3 bg-white text-black font-semibold px-3 py-1 rounded-full shadow-md">
                {fav.rating}
              </div>

              {/* Restaurant Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{fav.name}</h3>
                <p className="text-gray-500 text-sm">{fav.category}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Favorites;

  