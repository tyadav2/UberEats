import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function RestaurantPage({ addToCart }) {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurantDetails();
  }, []);

  const fetchRestaurantDetails = async () => {
    try {
      console.log("Fetching details for restaurant ID:", id); 

      // Get restaurant details
      const restaurantResponse = await axios.get(`http://localhost:5000/api/restaurants/${id}`);
      setRestaurant(restaurantResponse.data);

      // Get restaurant's dishes
      const dishesResponse = await axios.get(`http://localhost:5000/api/dishes/restaurant/${id}`);
      setDishes(dishesResponse.data);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
};

  
  

  return (
    <div className="restaurant-container">
      <div className="restaurant-header">
        <img 
          src={restaurant?.image_url} 
          alt={restaurant?.name}
          className="restaurant-banner"
        />
        <div className="restaurant-info">
          <h1>{restaurant?.name}</h1>
          <p className="restaurant-description">{restaurant?.description}</p>
          <div className="restaurant-details">
            <span>⭐{restaurant?.rating}</span>
            <span>📍 {restaurant?.location}</span>
            <span>💰 {restaurant?.price_range}</span>
            <span>🕒</span>
          </div>
        </div>
      </div>

      <div className="menu-section">
        <h2>Menu</h2>
        <div className="dishes-grid">
          {dishes.map((dish) => (
            <div key={dish.id} className="dish-card">
              <div className="dish-image">
                <img src={dish.image_url} alt={dish.name} />
              </div>
              <div className="dish-info">
                <h3>{dish.name}</h3>
                <p className="dish-description">{dish.description}</p>
                <div className="dish-footer">
                  <span className="price">${dish.price}</span>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => addToCart(dish)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cart-floating-btn" onClick={() => navigate("/cart")}>
        🛒 View Cart
      </div>
    </div>
  );
}

export default RestaurantPage;
