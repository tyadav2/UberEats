import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardNavbar from "../components/DashboardNavbar";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("customerToken"));
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      const response = await axios.get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const token = JSON.parse(localStorage.getItem("customerToken"));
      if (!token) {
        alert("Unauthorized. Please log in.");
        return;
      }

      await axios.delete(`http://localhost:5000/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(orders.filter(order => order.id !== orderId)); // Remove canceled order from UI
      alert("Order canceled successfully!");
    } catch (error) {
      console.error("Error canceling order:", error);
      alert("Failed to cancel order.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNavbar />

      <div className="max-w-4xl mt-20 mx-auto p-6 bg-white mt-10 shadow-lg rounded-md">
        <h2 className="text-2xl font-bold mb-6">Your Orders</h2>

        {/* Orders List */}
        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white shadow-lg rounded-lg p-4 border relative">
                
                {/* Order Number */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 text-sm">Order #{order.id}</span>
                  
                  {/* Order Status */}
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${
                      order.status === "Preparing" ? "bg-yellow-400 text-white" :
                      order.status === "Delivered" ? "bg-green-500 text-white" :
                      "bg-gray-400 text-white"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Restaurant Name */}
                <h3 className="text-lg font-bold">
                  🍽️ {order.restaurantName}
                </h3>

                {/* Order Items */}
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-gray-700 text-sm my-1">
                    <span>{item.name}</span>
                    <span className="bg-gray-200 px-2 py-1 text-xs rounded-full">x{item.quantity}</span>
                  </div>
                ))}

                {/* Order Total */}
                <div className="mt-2 text-gray-800 font-semibold">
                  Total: ${order.total.toFixed(2)}
                </div>

                {/* Cancel Order Button (only if allowed) */}
                {order.status === "Preparing" && (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="mt-3 bg-red-500 text-white px-4 py-2 rounded w-full hover:bg-red-600 transition"
                  >
                    ❌ Cancel Order
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Back to Dashboard Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Orders;
