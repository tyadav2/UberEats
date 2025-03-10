import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToggleButtons from "./ToggleButtons.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  FaReceipt,
  FaHeart,
  FaUser,
  FaBuilding,
  FaPlusCircle,
  FaMotorcycle,
  FaSignOutAlt,
  FaSearch,
  FaShoppingCart,
} from "react-icons/fa";

function DashboardNavbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Fetch address suggestions from OpenStreetMap
  const handleInputChange = async (e) => {
    const query = e.target.value;
    setAddress(query);

    if (query.length > 2) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${query}`,
          {
            headers: {
              "User-Agent": "UberEatsClone/1.0 (contact: adi.tekale99@gmail.com)",
              "Accept-Language": "en",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch address suggestions");
        }

        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Address fetch error:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Handle address selection
  const handleSelect = (selectedAddress) => {
    setAddress(selectedAddress);
    setSuggestions([]);
  };

  const handleLogout = () => {
    toast.success('Successfully logged out!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
    
    setTimeout(() => {
      navigate("/login");
      setIsOpen(false);
    }, 500);
  };
  

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <>
    <ToastContainer />
      {/* Navbar */}
      <nav className="main-navbar absolute top-0 left-0 w-full flex justify-between items-center p-4 bg-transparent z-10">
        {/* Hamburger Button */}
        <button onClick={() => setIsOpen(true)} className="text-2xl font-bold">
          ☰
        </button>

        {/* Clickable Uber Eats Branding */}
        <div
          className="text-2xl font-bold flex items-center pl-5 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          Uber <span className="text-green-600 ml-1">Eats</span>
        </div>

        {/* Include the Toggle Buttons Component */}
        <div className="ml-6">
          <ToggleButtons />
        </div>
        {/* Address Lookup Input */}
<div className="nav-center flex-1 mx-4 relative">
  <input
    type="text"
    placeholder="Enter your address"
    value={address}
    onChange={handleInputChange}
    className="address-input w-full p-2 rounded-full border border-gray-300 relative z-20"
  />
  {/* Address Suggestions Dropdown */}
  {suggestions.length > 0 && (
    <ul className="absolute left-0 right-0 w-full bg-white border border-gray-300 mt-20 rounded-lg shadow-lg max-h-40 overflow-y-auto z-50">
      {suggestions.map((suggestion) => (
        <li
          key={suggestion.place_id}
          className="p-2 cursor-pointer hover:bg-gray-100"
          onClick={() => handleSelect(suggestion.display_name)}
        >
          {suggestion.display_name}
        </li>
      ))}
    </ul>
  )}
</div>

        {/* Search input */}
        <div className="nav-center flex-1 mx-4 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search UberEats"
            className="pl-10 pr-80 py-2 w-98 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

      {/* Logout button on the main navbar */}
      <ul className="flex gap-6 items-center text-lg font-medium">
        <li>
          <button onClick={handleCartClick}>
            <FaShoppingCart />
          </button>
        </li>
        <li>
          <button onClick={handleLogout}>
            <FaSignOutAlt className="text-xl" />
          </button>
        </li>
      </ul>
      </nav>

      {/* Sidebar Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white p-6 z-30 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="mb-6 text-xl font-semibold"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>

        {/* Clickable Uber Eats Branding */}
        <div
          className="text-2xl font-bold text-black flex items-center mb-6 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Uber <span className="text-green-600 ml-1">Eats</span>
        </div>

        {/* Sidebar Links */}
        <ul className="space-y-4">
          <li className="flex items-center py-2 border-b border-gray-200">
            <FaReceipt className="mr-2" />
            <button onClick={() => navigate("/orders")} className="hover:text-green-600">
              Orders
            </button>
          </li>
          <li className="flex items-center py-2 border-b border-gray-200">
            <FaHeart className="mr-2" />
            <button onClick={() => navigate("/favorites")} className="hover:text-green-600">
              Favorites
            </button>
          </li>
          <li className="flex items-center py-2 border-b border-gray-200">
            <FaUser className="mr-2" />
            <button onClick={() => navigate("/profile")} className="hover:text-green-600">
              Profile
            </button>
          </li>
          <li className="flex items-center py-2 border-b border-gray-200">
            <FaBuilding className="mr-2" />
            <button onClick={() => navigate("/restaurant/dashboard")} className="hover:text-green-600">
              Create a Business Account
            </button>
          </li>
          <li className="flex items-center py-2 border-b border-gray-200">
            <FaPlusCircle className="mr-2" />
            <button onClick={() => navigate("/restaurant/signup")} className="hover:text-green-600">
              Add your restaurant
            </button>
          </li>
          <li className="flex items-center py-2 border-b border-gray-200">
            <FaMotorcycle className="mr-2" />
            <button onClick={() => navigate("/restaurant/signup")} className="hover:text-green-600">
              Sign up to deliver
            </button>
          </li>
        </ul>

        <ul className="mt-6">
          <li className="flex items-center py-2 border-b border-gray-200">
            <FaSignOutAlt className="mr-2" />
            <button onClick={handleLogout} className="hover:text-green-600">
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default DashboardNavbar;
