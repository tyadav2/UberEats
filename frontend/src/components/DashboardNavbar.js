import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToggleButtons from "./ToggleButtons.js";

// Import the icons you need from react-icons (adjust to your preference)
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

  const handleLogout = () => {
    navigate("/");
    setIsOpen(false);
  };

  const handleRestaurantDashboard = () => {
    navigate("/restaurant/dashboard");
    setIsOpen(false);
  };

  const handleRestaurantSignup = () => {
    navigate("/restaurant/signup");
    setIsOpen(false);
  };

  const handleOrders = () => {
    navigate("/orders");
    setIsOpen(false);
  };

  const handleFavorites = () => {
    navigate("/favorites");
    setIsOpen(false);
  };

  const handleProfile = () => {
    navigate("/profile");
    setIsOpen(false);
  };

  const handleOrderCart = () => {
    navigate("/order/cart");
    setIsOpen(false);
  };

  

  return (
    <>
      {/* Navbar */}
      <nav className="main-navbar absolute top-0 left-0 w-full flex justify-between items-center p-4 bg-transparent z-10">
        {/* Hamburger Button */}
        <button onClick={() => setIsOpen(true)} className="text-2xl font-bold">
          ☰
        </button>

        {/* Clickable Uber Eats Branding */}
        <div
          className="text-2xl font-bold flex items-center pl-5 cursor-pointer"
          onClick={() => navigate("/dashboard")} // Navigate to Dashboard when clicked
        >
          Uber <span className="text-green-600 ml-1">Eats</span>
        </div>

        {/* Include the Toggle Buttons Component */}
        <div className="ml-6">
          <ToggleButtons />
        </div>


        {/* Address/Search input */}
        <div className="nav-center flex-1 mx-4">
          <input
            type="text"
            placeholder="Enter your address"
            className="address-input w-full p-2 rounded-full border border-gray-300"
          />
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
            < FaShoppingCart />
          <li>
            <button
              onClick={handleOrderCart}
            >
              
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
            <button onClick={handleOrders} className="hover:text-green-600">
              Orders
            </button>
          </li>
          <li className="flex items-center py-2 border-b border-gray-200">
            <FaHeart className="mr-2" />
            <button onClick={handleFavorites} className="hover:text-green-600">
              Favorites
            </button>
          </li>
          <li className="flex items-center py-2 border-b border-gray-200">
            <FaUser className="mr-2" />
            <button onClick={handleProfile} className="hover:text-green-600">
              Profile
            </button>
          </li>
          <li className="flex items-center py-2 border-b border-gray-200">
            <FaBuilding className="mr-2" />
            <button
              onClick={handleRestaurantDashboard}
              className="hover:text-green-600"
            >
              Create a Business Account
            </button>
          </li>
          <li className="flex items-center py-2 border-b border-gray-200">
            <FaPlusCircle className="mr-2" />
            <button
              onClick={handleRestaurantSignup}
              className="hover:text-green-600"
            >
              Add your restaurant
            </button>
          </li>
          <li className="flex items-center py-2 border-b border-gray-200">
            <FaMotorcycle className="mr-2" />
            <button
              onClick={handleRestaurantSignup}
              className="hover:text-green-600"
            >
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
