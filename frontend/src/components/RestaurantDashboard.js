import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RestaurantDashboard = () => {
    const [restaurant, setRestaurant] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRestaurant = async () => {
            const token = localStorage.getItem("restaurantToken");
            if (!token) {
                alert("Unauthorized! Please log in.");
                navigate("/restaurant/login");
                return;
            }

            try {
                const response = await axios.get("http://localhost:5000/api/restaurants/profile", {
                    headers: { Authorization: `Bearer ${JSON.parse(token)}` }
                });
                setRestaurant(response.data);
            } catch (error) {
                console.error("Error fetching restaurant:", error);
                alert("Error fetching restaurant profile.");
            }
        };

        fetchRestaurant();
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Restaurant Dashboard</h1>

            {restaurant ? (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-2">Welcome, {restaurant.name}!</h2>
                    <p className="text-gray-700">Cuisine: {restaurant.cuisine}</p>
                    <p className="text-gray-700">Location: {restaurant.location}</p>

                    <button 
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => {
                            localStorage.removeItem("restaurantToken");
                            navigate("/restaurant/login");
                        }}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <p>Loading restaurant data...</p>
            )}
        </div>
    );
};

export default RestaurantDashboard;
