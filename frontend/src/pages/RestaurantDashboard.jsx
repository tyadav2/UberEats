import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RestaurantDashboard = () => {
    const [restaurant, setRestaurant] = useState(null);
    const [activeTab, setActiveTab] = useState("profile");
    const [dishes, setDishes] = useState([]);
    const [orders, setOrders] = useState([]);
    const [newDish, setNewDish] = useState({ name: "", description: "", price: "", image_url: "" });

    const navigate = useNavigate();
    //const token = localStorage.getItem("restaurantToken");
    //const token = JSON.parse(localStorage.getItem("restaurantToken")); 
    const token = localStorage.getItem("restaurantToken");


    useEffect(() => {
        if (!token) {
            console.error("No token found! Redirecting to login.");
            navigate("/restaurant/login");
            return;
        }
        fetchRestaurantProfile();
        fetchDishes();
        fetchOrders();
    }, []);

    // Fetch restaurant profile
    const fetchRestaurantProfile = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/restaurants/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRestaurant(response.data);
        } catch (error) {
            console.error("Error fetching restaurant profile:", error.response?.data || error.message);
            alert("Authentication failed! Please log in again.");
            navigate("/restaurants/login");
        }
    };

    // Fetch dishes
    const fetchDishes = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/dishes", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDishes(response.data);
        } catch (error) {
            console.error("Error fetching dishes:", error);
        }
    };

    // Fetch orders
    const fetchOrders = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/orders", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    // Update restaurant profile
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:5000/api/restaurants/profile", restaurant, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Update failed!");
        }
    };

    // Add a new dish
    const handleAddDish = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/dishes", newDish, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Dish added successfully!");
            setNewDish({ name: "", description: "", price: "", image_url: "" });
            fetchDishes();
        } catch (error) {
            console.error("Error adding dish:", error);
            alert("Failed to add dish!");
        }
    };

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("restaurantToken");
        navigate("/");
    };

    if (!restaurant) {
        return <div className="flex justify-center items-center h-screen text-gray-600 text-lg">Loading...</div>;
    }

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-900 text-white p-6">
                <h2 className="text-2xl font-bold mb-6">Restaurant Dashboard</h2>
                <ul className="space-y-4">
                    <li className={`cursor-pointer p-2 rounded ${activeTab === "profile" ? "bg-green-600" : ""}`} onClick={() => setActiveTab("profile")}>
                        Profile
                    </li>
                    <li className={`cursor-pointer p-2 rounded ${activeTab === "dishes" ? "bg-green-600" : ""}`} onClick={() => setActiveTab("dishes")}>
                        Manage Dishes
                    </li>
                    <li className={`cursor-pointer p-2 rounded ${activeTab === "orders" ? "bg-green-600" : ""}`} onClick={() => setActiveTab("orders")}>
                        Orders
                    </li>
                    <li className="cursor-pointer p-2 rounded bg-red-500 mt-10 text-center" onClick={handleLogout}>
                        Logout
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="w-3/4 p-6 overflow-auto">
                {activeTab === "profile" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Restaurant Profile</h2>
                        <form onSubmit={handleProfileUpdate} className="space-y-4">
                            <input type="text" value={restaurant.name} onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value })} className="w-full p-3 border rounded" required />
                            <textarea value={restaurant.description} onChange={(e) => setRestaurant({ ...restaurant, description: e.target.value })} className="w-full p-3 border rounded" required />
                            <button type="submit" className="bg-green-600 text-white p-3 rounded">Update Profile</button>
                        </form>
                    </div>
                )}

                {activeTab === "dishes" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Manage Dishes</h2>
                        <ul className="space-y-4">
                            {dishes.map((dish) => (
                                <li key={dish.id} className="p-4 border rounded flex justify-between">
                                    <span>{dish.name} - ${dish.price}</span>
                                    <button className="bg-red-500 text-white p-2 rounded">Delete</button>
                                </li>
                            ))}
                        </ul>

                        <h3 className="text-xl font-bold mt-6">Add New Dish</h3>
                        <form onSubmit={handleAddDish} className="space-y-4">
                            <input type="text" placeholder="Dish Name" value={newDish.name} onChange={(e) => setNewDish({ ...newDish, name: e.target.value })} className="w-full p-3 border rounded" required />
                            <input type="text" placeholder="Description" value={newDish.description} onChange={(e) => setNewDish({ ...newDish, description: e.target.value })} className="w-full p-3 border rounded" required />
                            <input type="number" placeholder="Price" value={newDish.price} onChange={(e) => setNewDish({ ...newDish, price: e.target.value })} className="w-full p-3 border rounded" required />
                            <button type="submit" className="bg-green-600 text-white p-3 rounded">Add Dish</button>
                        </form>
                    </div>
                )}

                {activeTab === "orders" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Orders</h2>
                        <ul className="space-y-4">
                            {orders.map((order) => (
                                <li key={order.id} className="p-4 border rounded">Order #{order.id} - {order.status}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RestaurantDashboard;