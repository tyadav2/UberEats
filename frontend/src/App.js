import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Favorites from './pages/Favorites';
import RestaurantSignup from "./components/RestaurantSignup";
import RestaurantLogin from "./components/RestaurantLogin";
import RestaurantList from './components/RestaurantList';
import Profile from "./pages/UserProfile";
import Orders from "./pages/Orders";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/restaurant/signup" element={<RestaurantSignup />} />
                <Route path="/restaurant/login" element={<RestaurantLogin />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/restaurant/list" element={<RestaurantList />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
            </Routes>
        </Router>
    );
}

export default App;
