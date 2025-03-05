import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import RestaurantDashboard from "./components/RestaurantDashboard"; // ✅ Import restaurant dashboard
import Login from "./components/Login";
import RestaurantSignup from "./components/RestaurantSignup";
import RestaurantLogin from "./components/RestaurantLogin";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/restaurant/signup" element={<RestaurantSignup />} />
                <Route path="/restaurant/login" element={<RestaurantLogin />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} /> 
            </Routes>
        </Router>
    );
}

export default App;
