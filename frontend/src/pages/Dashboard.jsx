import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import DashboardNavbar from '../components/DashboardNavbar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [restaurants, setRestaurants] = useState([]);
    const [sortedRestaurants, setSortedRestaurants] = useState([]);
    //const [favorites, setFavorites] = useState(new Set()); 
    const [sortOrder, setSortOrder] = useState("default");
    const navigate = useNavigate();



  useEffect(() => {
    fetchRestaurants();
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
    <div 
    key={rest.id} 
    className="relative bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 ease-in-out"
    onClick={() => navigate(`/restaurants/${rest.id}`)}
  >
  


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