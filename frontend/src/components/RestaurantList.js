import { useEffect, useState } from "react";
import axios from "axios";

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await axios.get("http://localhost:5000/api/restaurants");
      setRestaurants(response.data);
    };
    fetchRestaurants();
  }, []);

  return (
    <div>
      <h2>Restaurants</h2>
      <ul>
        {restaurants.map((r) => (
          <li key={r.id}>{r.name} - {r.cuisine} - {r.location}</li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantList;
