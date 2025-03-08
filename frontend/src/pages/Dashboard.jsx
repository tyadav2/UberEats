import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import DashboardNavbar from '../components/DashboardNavbar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../App.css'; // For styling
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [restaurants, setRestaurants] = useState([]);
    const [sortedRestaurants, setSortedRestaurants] = useState([]);
    const [favorites, setFavorites] = useState(new Set()); // ✅ Tracks favorited restaurants
    const [sortOrder, setSortOrder] = useState("default");
    const navigate = useNavigate();



  useEffect(() => {
    fetchRestaurants();
    fetchFavorites();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/restaurants');
      setRestaurants(response.data);
      setSortedRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  // Fetch user's favorites from backend
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
  
      if (!response.data || response.data.length === 0) {
        setFavorites(new Set()); // ✅ Prevent stale state issues
        return;
      }
  
      const favoriteSet = new Set(response.data.map((fav) => fav.restaurantId)); 
      setFavorites(favoriteSet); // ✅ Ensure state updates
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };
  
  
    // Toggle favorite status
    const toggleFavorite = async (restaurantId) => {
        try {
          const token = JSON.parse(localStorage.getItem("customerToken")); 
      
          if (!token) {
            alert("Unauthorized: Please log in again.");
            return;
          }
      
          const isFavorite = favorites.has(restaurantId);
      
          if (isFavorite) {
            await axios.delete(`http://localhost:5000/api/favorites/${restaurantId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
      
            setFavorites(prevFavorites => {
              const updatedFavorites = new Set(prevFavorites);
              updatedFavorites.delete(restaurantId);
              return new Set(updatedFavorites); // ✅ Ensure state updates
            });
      
          } else {
            await axios.post(
              "http://localhost:5000/api/favorites",
              { restaurantId },
              { headers: { Authorization: `Bearer ${token}` } }
            );
      
            setFavorites(prevFavorites => {
              const updatedFavorites = new Set(prevFavorites);
              updatedFavorites.add(restaurantId);
              return new Set(updatedFavorites); // ✅ Ensure state updates
            });
          }
      
          // ✅ **Re-fetch favorites after updating state**
          fetchFavorites(); 
      
        } catch (error) {
          console.error("Error updating favorite:", error);
          alert("Failed to update favorite. Please try again.");
        }
      };
      

  useEffect(() => {
    if (sortOrder === 'asc') {
      setSortedRestaurants([...restaurants].sort((a, b) => a.rating - b.rating));
    } else if (sortOrder === 'desc') {
      setSortedRestaurants([...restaurants].sort((a, b) => b.rating - a.rating));
    } else {
      setSortedRestaurants(restaurants);
    }
  }, [sortOrder, restaurants]);

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  // Food categories with images
  const foodCategories = [
    { name: 'Burger', image: 'https://img.freepik.com/premium-vector/burger-icon-cartoon-hamburger-fast-food-symbol_80590-14811.jpg' },
    { name: 'Caribbean', image: 'https://static.vecteezy.com/system/resources/previews/049/700/597/non_2x/traditional-mole-poblano-with-rice-vector.jpg' },
    { name: 'Drinks', image: 'https://cdn-icons-png.flaticon.com/512/820/820603.png' },
    { name: 'Fast Food', image: 'https://cdn3.vectorstock.com/i/1000x1000/53/47/french-fries-icon-design-template-isolated-vector-48915347.jpg' },
    { name: 'Grocery', image: 'https://thumbs.dreamstime.com/b/isolated-grocery-bag-icon-groceries-icons-vector-191341179.jpg' },
    { name: 'Dessert', image: 'https://cdn-icons-png.flaticon.com/512/1205/1205153.png' },
    { name: 'Japanese', image: 'https://static.vecteezy.com/system/resources/previews/012/450/052/non_2x/ramen-noodle-illustration-cartoon-food-and-drink-logo-japanese-food-icon-bowl-and-chopsticks-symbol-free-vector.jpg' },
    { name: 'Italian', image: 'https://st2.depositphotos.com/36103482/49106/v/450/depositphotos_491068272-stock-illustration-fried-noodle-on-plate-vintage.jpg' },
    { name: 'Box Catering', image: 'https://www.shutterstock.com/image-vector/takeaway-food-line-icon-carton-600nw-2498936087.jpg' },
    { name: 'Seafood', image: 'https://cdn-icons-png.flaticon.com/512/4223/4223439.png' },
    { name: 'Sushi', image: 'https://img.freepik.com/premium-vector/sushi-icon-isometric-3d-style-isolated-white-background-food-symbol_96318-12374.jpg' },
    { name: 'Alcohol', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6ycKycUpkZiYvTiIfzrAatAgrXkOOfbpoOw&s' },
    { name: 'Wings', image: 'https://static.vecteezy.com/system/resources/previews/008/441/867/non_2x/crispy-fried-chicken-leg-illustration-flat-icon-illustration-design-fast-food-fried-chicken-leg-flat-design-vector.jpg' }
  ];

  const PrevArrow = ({ onClick }) => (
    <button
      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow-md rounded-full z-10"
      onClick={onClick}
    >
      <FaChevronLeft className="text-black text-lg" />
    </button>
  );
  
  const NextArrow = ({ onClick }) => (
    <button
      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow-md rounded-full z-10"
      onClick={onClick}
    >
      <FaChevronRight className="text-black text-lg" />
    </button>
  );
  

  // Carousel settings
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 11,
    slidesToScroll: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 6, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 4, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 3, slidesToScroll: 1 } }
    ]
  };

  return (
    <div className="dashboard-container">
      <DashboardNavbar />

      {/* Food Categories Carousel */}
      <div className="food-carousel-container mt-20">
        <Slider {...sliderSettings}>
          {foodCategories.map((category, index) => (
            <div key={index} className="text-center">
              <div className="flex flex-col items-center">
                <img src={category.image} alt={category.name} className="w-14 h-14" />
                <span className="text-sm font-medium mt-1">{category.name}</span>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Sorting Controls */}
      <div className="sorting-controls flex p-5 justify-left gap-4 mt-4">
        <button
          className={`px-4 py-2 rounded-full border ${sortOrder === 'asc' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'} hover:bg-green-600`}
          onClick={() => handleSortChange('asc')}
        >
          Rating: Low to High
        </button>
        <button
          className={`px-4 py-2 rounded-full border ${sortOrder === 'desc' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'} hover:bg-green-600`}
          onClick={() => handleSortChange('desc')}
        >
          Rating: High to Low
        </button>
        <button
          className="px-4 py-2 rounded-full border bg-gray-300 hover:bg-gray-400"
          onClick={() => handleSortChange('default')}
        >
          Reset
        </button>
      </div>
        
        <h1 className="text-2xl font-semibold mb-4 p-5">Featured on Uber Eats</h1>
      
      {/* Restaurant Grid */}
<div className="restaurant-grid p-5 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {sortedRestaurants.map((rest) => (
    <div key={rest.id} className="relative bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 ease-in-out">
      
      {/* Favorite Heart Button */}
        <button 
        onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(rest.id);
        }}
        className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
        aria-label={favorites.has(rest.id) ? "Remove from favorites" : "Add to favorites"}
        >
        {favorites.has(rest.id) ? ( // ✅ Now correctly fills heart for already favorited items
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        )}
        </button>


      {/* Restaurant Image */}
      <div className="relative w-full h-44">
        <img
          src={rest.image_url || 'https://via.placeholder.com/300'}
          alt={rest.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Rating Badge */}
      <div className="absolute bottom-3 right-3 bg-white text-black font-semibold px-3 py-1 rounded-full shadow-md">
        {rest.rating}
      </div>

      {/* Restaurant Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{rest.name}</h3>
        <p className="text-gray-500 text-sm">{rest.category}</p>
      </div>
    </div>
  ))}
</div>
    </div>
  );
}

export default Dashboard;



