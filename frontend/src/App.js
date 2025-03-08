import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Favorites from './pages/Favorites';
import RestaurantSignup from "./pages/RestaurantSignup";
import RestaurantLogin from "./pages/RestaurantLogin";
import RestaurantList from './components/RestaurantList';
import RestaurantDashboard from "./pages/RestaurantDashboard";
import Profile from "./pages/UserProfile";
import Orders from "./pages/Orders";
import CartPage from "./pages/CartPage";
import RestaurantPage from "./pages/RestaurantPage";

function App() {
    const [cart, setCart] = useState([]);

  const addToCart = (dish) => {
    setCart((prevCart) => [...prevCart, dish]); //Add dish to cart
  };
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/restaurant/signup" element={<RestaurantSignup />} />
                <Route path="/restaurant/login" element={<RestaurantLogin />} />
                <Route path ="/restaurant/dashboard" element={<RestaurantDashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/restaurant/list" element={<RestaurantList />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/restaurant/:id" element={<RestaurantPage addToCart={addToCart} />} />
                <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
            </Routes>
        </Router>
    );
}

export default App;
