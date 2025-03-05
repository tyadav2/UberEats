import React, { useState } from 'react';
import axios from 'axios';

const RestaurantSignup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [businessHours, setBusinessHours] = useState('');
    const [cuisine, setCuisine] = useState(''); // ✅ Added cuisine field

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ Ensure cuisine is included in API request
        const data = { name, email, password, location, description, businessHours, cuisine };

        try {
            const response = await axios.post('http://localhost:5000/api/restaurants/signup', data);
            alert(response.data.message);
            window.location.href = '/restaurant/login'; // Redirect to restaurant login after successful signup
        } catch (error) {
            alert('Error: ' + error.response?.data?.error || "Signup failed!");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Add Your Restaurant</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Restaurant Name</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter restaurant name" required />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter restaurant email" required />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter password" required />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                        <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)}
                            className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter restaurant location" required />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter a brief description" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700">Cuisine</label>
                        <input type="text" id="cuisine" value={cuisine} onChange={(e) => setCuisine(e.target.value)}
                            className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Cuisine Type (e.g., Indian, Italian)" required />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="businessHours" className="block text-sm font-medium text-gray-700">Business Hours</label>
                        <input type="text" id="businessHours" value={businessHours} onChange={(e) => setBusinessHours(e.target.value)}
                            className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter business hours (e.g., 9 AM - 5 PM)" />
                    </div>

                    <button type="submit"
                        className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RestaurantSignup;