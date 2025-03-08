import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RestaurantDashboard = () => {
    const [restaurant, setRestaurant] = useState(null);
    const [activeTab, setActiveTab] = useState("profile");
    const [dishes, setDishes] = useState([]);
    const [newDish, setNewDish] = useState({ name: "", ingredients: "", price: "", image: null, category: "Appetizer", description: "" });
    const [dishPreview, setDishPreview] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const navigate = useNavigate();
    const token = localStorage.getItem("restaurantToken");

    useEffect(() => {
        if (!token) {
            console.error("No token found! Redirecting to login.");
            navigate("/restaurant/login");
            return;
        }
        fetchRestaurantProfile();
        fetchDishes();
    }, []);

    // Fetch restaurant profile
    const fetchRestaurantProfile = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/restaurants/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRestaurant(response.data);
            setImagePreview(response.data.image_url);
        } catch (error) {
            console.error("Error fetching restaurant profile:", error);
            alert("Authentication failed! Please log in again.");
            navigate("/restaurant/login");
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

    // Update restaurant profile
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:5000/api/restaurants/profile", restaurant, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Profile updated successfully!");
            fetchRestaurantProfile();
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Update failed!");
        }
    };

    // Handle Profile Image Upload
    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setRestaurant({ ...restaurant, image_url: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Handle Dish Image Upload
    const handleDishImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewDish({ ...newDish, image: file });
            setDishPreview(URL.createObjectURL(file));
        }
    };

    // Add a new dish
    // Add a new dish
const handleAddDish = async (e) => {
    e.preventDefault();

    // Create regular JSON object instead of FormData
    const dishData = {
        name: newDish.name,
        ingredients: newDish.ingredients,
        price: newDish.price,
        category: newDish.category,
        description: newDish.description
    };

    // Handle image: if it's a file, we need to handle it differently
    if (typeof newDish.image === 'string' && newDish.image.startsWith('http')) {
        dishData.image = newDish.image;
    } else if (newDish.image instanceof File) {
        // If we need file upload, we would need to handle it differently
        // For now, let's skip this part and rely on image URLs
        alert("Please use an image URL instead of file upload for now.");
        return;
    } else {
        // If no image is provided, use a placeholder
        dishData.image = "https://via.placeholder.com/300";
    }

    try {
        await axios.post("http://localhost:5000/api/dishes", dishData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", // Change to JSON instead of FormData
            },
        });

        alert("Dish added successfully!");
        setNewDish({ name: "", ingredients: "", price: "", image: null, category: "Appetizer", description: "" });
        setDishPreview(null);
        fetchDishes();
    } catch (error) {
        console.error("Error adding dish:", error);
        if (error.response) {
            // Log more detailed error information
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            alert(`Failed to add dish: ${error.response.data.message || error.response.statusText}`);
        } else {
            alert("Failed to add dish! Check console for details.");
        }
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
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar Navigation */}
            <div className="w-1/5 bg-gray-900 text-white p-6 fixed h-screen">
                <h1 className="text-2xl font-bold text-green-400 mb-4">Uber Eats <span className="text-gray-200">for Merchants</span></h1>
                <h2 className="text-lg font-semibold mb-6">{restaurant.name} - Dashboard</h2>

                <ul className="space-y-4">
                    <li className={`cursor-pointer p-3 rounded ${activeTab === "profile" ? "bg-green-600" : ""}`} onClick={() => setActiveTab("profile")}>
                        Profile Management
                    </li>
                    <li className={`cursor-pointer p-3 rounded ${activeTab === "addDish" ? "bg-green-600" : ""}`} onClick={() => setActiveTab("addDish")}>
                        Add New Dish
                    </li>
                    <li className={`cursor-pointer p-3 rounded ${activeTab === "manageDishes" ? "bg-green-600" : ""}`} onClick={() => setActiveTab("manageDishes")}>
                        View / Manage Dishes
                    </li>
                    <li className="cursor-pointer p-3 rounded bg-red-500 mt-10 text-center" onClick={handleLogout}>
                        Logout
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="w-4/5 ml-auto p-6 overflow-auto">
                {/* ✅ Profile Management Section */}
                {activeTab === "profile" && (
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Manage Profile</h3>
                        <form onSubmit={handleProfileUpdate} className="space-y-4">
                            <input type="text" placeholder="Restaurant Name" value={restaurant.name} onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value })} className="w-full p-3 border rounded" required />
                            <input type="text" placeholder="Location" value={restaurant.location} onChange={(e) => setRestaurant({ ...restaurant, location: e.target.value })} className="w-full p-3 border rounded" required />
                            <input type="text" placeholder="Contact Info" value={restaurant.phone_number} onChange={(e) => setRestaurant({ ...restaurant, phone_number: e.target.value })} className="w-full p-3 border rounded" required />
                            <textarea placeholder="Description" value={restaurant.description} onChange={(e) => setRestaurant({ ...restaurant, description: e.target.value })} className="w-full p-3 border rounded" required />

                            {/* ✅ Profile Image */}
                            <div className="flex items-center space-x-4">
                                {imagePreview && (
                                    <img src={imagePreview} alt="Profile Preview" className="w-24 h-24 rounded-lg border" />
                                )}
                                <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                                    Change Profile Image
                                    <input type="file" name="profileImage" onChange={handleProfileImageChange} className="hidden" />
                                </label>
                            </div>

                            <button type="submit" className="bg-green-600 text-white p-3 rounded w-full">Update Profile</button>
                        </form>
                    </div>
                )}

                {/* ✅ Add New Dish Section */}
                {/* Add New Dish Section */}
{activeTab === "addDish" && (
    <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Add New Dish</h3>
        <form onSubmit={handleAddDish} className="space-y-4">
            <input 
                type="text" 
                placeholder="Dish Name" 
                value={newDish.name} 
                onChange={(e) => setNewDish({ ...newDish, name: e.target.value })} 
                className="w-full p-3 border rounded" 
                required 
            />
            
            <textarea 
                placeholder="Ingredients (comma separated)" 
                value={newDish.ingredients} 
                onChange={(e) => setNewDish({ ...newDish, ingredients: e.target.value })} 
                className="w-full p-3 border rounded" 
                required 
            />
            
            <input 
                type="number" 
                placeholder="Price ($)" 
                value={newDish.price} 
                onChange={(e) => setNewDish({ ...newDish, price: e.target.value })} 
                className="w-full p-3 border rounded" 
                min="0.01" 
                step="0.01" 
                required 
            />
            
            <select 
                value={newDish.category} 
                onChange={(e) => setNewDish({ ...newDish, category: e.target.value })} 
                className="w-full p-3 border rounded" 
                required
            >
                <option value="Appetizer">Appetizer</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
                <option value="Beverage">Beverage</option>
                <option value="Side Dish">Side Dish</option>
                <option value="Salad">Salad</option>
            </select>
            
            <textarea 
                placeholder="Dish Description" 
                value={newDish.description} 
                onChange={(e) => setNewDish({ ...newDish, description: e.target.value })} 
                className="w-full p-3 border rounded" 
                required 
            />

            {/* Image Input - Now with URL option */}
            <div className="space-y-4">
                <h4 className="font-medium">Dish Image</h4>
                
                {/* Option to input URL */}
                <input 
                    type="text" 
                    placeholder="Image URL (e.g., https://example.com/image.jpg)" 
                    value={typeof newDish.image === 'string' ? newDish.image : ''} 
                    onChange={(e) => {
                        setNewDish({ ...newDish, image: e.target.value });
                        setDishPreview(e.target.value); // Set preview to the URL
                    }} 
                    className="w-full p-3 border rounded" 
                />
                
                <p className="text-sm text-gray-500">-- OR --</p>
                
                {/* Option to upload file */}
                <div className="flex items-center space-x-4">
                    {dishPreview && (
                        <img src={dishPreview} alt="Dish Preview" className="w-24 h-24 rounded-lg border object-cover" />
                    )}
                    <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                        Upload Dish Image
                        <input type="file" name="dishImage" onChange={handleDishImageChange} className="hidden" accept="image/*" />
                    </label>
                </div>
            </div>

            <button type="submit" className="bg-green-600 text-white p-3 rounded w-full">Add Dish</button>
        </form>
    </div>
)}

                {/* ✅ View / Manage Dishes Section */}
                {activeTab === "manageDishes" && (
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">View / Manage Dishes</h3>
                        {dishes.length === 0 ? (
                            <p className="text-gray-500">No dishes available. Add your first dish!</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {dishes.map(dish => (
                                    <div key={dish.id} className="border rounded-lg p-4 shadow-sm">
                                        <img 
                                            src={dish.image} 
                                            alt={dish.name} 
                                            className="w-full h-48 object-cover rounded-lg mb-2" 
                                        />
                                        <h4 className="font-semibold text-lg">{dish.name}</h4>
                                        <p className="text-green-600 font-bold">${dish.price}</p>
                                        <p className="text-sm text-gray-600">{dish.category}</p>
                                        <p className="text-sm mt-2">{dish.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RestaurantDashboard;