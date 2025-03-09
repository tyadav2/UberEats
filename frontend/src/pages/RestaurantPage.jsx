import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RestaurantPage = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch restaurant details and dishes
  useEffect(() => {
    const fetchRestaurantAndDishes = async () => {
      try {
        setLoading(true);

        // Fetch restaurant details
        const restaurantResponse = await axios.get(
          `http://localhost:5000/api/restaurants/${restaurantId}`
        );
        setRestaurant(restaurantResponse.data);

        // Fetch dishes for the restaurant
        const dishesResponse = await axios.get(
          `http://localhost:5000/api/dishes/restaurant/${restaurantId}`
        );
        setDishes(dishesResponse.data);

        console.log("Dishes API Response:", dishesResponse.data); // Debugging

        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching data");
        setLoading(false);
      }
    };

    fetchRestaurantAndDishes();
  }, [restaurantId]);

  // Function to add items to cart
  const addToCart = (dish) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = existingCart.findIndex((item) => item.id === dish.id);

    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({ ...dish, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert(`${dish.name} added to cart!`);
  };

  // If loading, show loader
  if (loading) return <div className="text-center mt-10">Loading...</div>;

  // If error, show error message
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{restaurant?.name || "Restaurant"}</h1>
          <button
            onClick={() => navigate("/cart")}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            🛒 Go to Cart
          </button>
        </div>

        {/* Restaurant Info */}
        <div className="bg-white p-4 shadow-md rounded-lg mb-6">
          <p className="text-gray-600">{restaurant?.description || "No description available"}</p>
        </div>

        {/* Dishes List */}
        <h2 className="text-2xl font-semibold mb-4">Menu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dishes.length === 0 ? (
            <p className="text-gray-500">No dishes available</p>
          ) : (
            dishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
              >
                {dish.image && (
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                )}
                <h3 className="text-lg font-semibold">{dish.name}</h3>
                <p className="text-gray-600 text-sm">{dish.description}</p>
                <p className="text-lg font-bold mt-2">
                  ${Number(dish.price).toFixed(2)}
                </p>

                <button
                  onClick={() => addToCart(dish)}
                  className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600"
                >
                  ➕ Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
