/*function Dashboard() {
  useEffect(() => {
  document.body.classList.add("no-navbar");
  return () => {
    document.body.classList.remove("no-navbar");
  };
}, []);*/

import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/restaurants")
            .then((response) => {
                setRestaurants(response.data);
            })
            .catch((error) => {
                console.error("Error fetching restaurants:", error);
            });
            document.body.classList.add("no-navbar");
              return () => {
                document.body.classList.remove("no-navbar");
  };
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <h2 className="text-2xl font-semibold mb-4">Featured Restaurants</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {restaurants.map((restaurant) => (
                    <div key={restaurant.id} className="bg-white p-4 rounded-lg shadow-md">
                        <img src={restaurant.image_url} alt={restaurant.name} className="w-full h-40 object-cover rounded-md" />
                        <h3 className="text-lg font-semibold mt-2">{restaurant.name}</h3>
                        <p className="text-gray-600">{restaurant.cuisine} - {restaurant.category}</p>
                        <span className="text-sm font-semibold bg-gray-200 px-2 py-1 rounded-md">
                            ⭐ {restaurant.rating}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
