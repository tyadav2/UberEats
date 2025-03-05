import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer"); // Default role is customer
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Ensure role is correctly set
      if (!role) {
        alert("Please select a role (Customer or Restaurant)!");
        return;
      }

      // Corrected API URL based on role
      const apiUrl = role === "customer"
        ? "http://localhost:5000/api/users/login"  // Corrected for customer
        : "http://localhost:5000/api/restaurants/login"; // Corrected for restaurant

      console.log("Selected Role:", role);
      console.log("API Request URL:", apiUrl);

      // Make API request with email and password
      const response = await axios.post(apiUrl, { email, password });

      // Store the token in localStorage
      localStorage.setItem(`${role}Token`, JSON.stringify(response.data.token));

      console.log(`${role.charAt(0).toUpperCase() + role.slice(1)} login successful:`, response.data);
      alert("Login successful!");

      // Redirect based on role
      navigate(role === "customer" ? "/dashboard" : "/restaurant/dashboard");
    } catch (error) {
      console.error("Login failed:", error);

      // Improved error handling
      if (error.response) {
        alert(error.response.data.message || "Invalid credentials!");
      } else {
        alert("Login failed! Please check your internet connection.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Uber Eats Branding */}
      <h1 className="text-4xl font-bold mb-6">
        Uber <span className="text-green-600">Eats</span>
      </h1>

      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        {/* Role Selector */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Login As</label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="role"
                value="customer"
                checked={role === "customer"}
                onChange={(e) => setRole(e.target.value)}
                className="mr-2"
              />
              Customer
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="restaurant"
                checked={role === "restaurant"}
                onChange={(e) => setRole(e.target.value)}
                className="mr-2"
              />
              Restaurant
            </label>
          </div>
        </div>

        {/* Login Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="flex flex-col space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
