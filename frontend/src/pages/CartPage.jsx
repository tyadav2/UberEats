import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Get cart items from localStorage
    const items = JSON.parse(localStorage.getItem('cart')) || [];

    // Convert price to a number before calculations
    const updatedItems = items.map(item => ({
      ...item,
      price: Number(item.price),
    }));

    setCartItems(updatedItems);

    // Calculate total price
    const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalPrice(total);
  }, []);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map(item =>
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Recalculate total price
    const newTotal = updatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalPrice(newTotal);
  };

  const removeItem = (itemId) => {
    const updatedCart = cartItems.filter(item => item._id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Recalculate total price
    const newTotal = updatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalPrice(newTotal);
  };

  const placeOrder = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("customerToken"));
      if (!token) {
        alert("Unauthorized. Please log in.");
        return;
      }
  
      if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
      }
  
      // Extract restaurantId from the first cart item (assuming all items are from the same restaurant)
      const restaurantId = cartItems[0].restaurantId; 
  
      if (!restaurantId) {
        alert("Invalid restaurant. Please try again.");
        return;
      }
  
      // Ensure prices are numbers and construct valid order items array
      const orderItems = cartItems.map(item => ({
        dishId: item._id,  // Assuming `_id` is dish identifier
        name: item.name,
        quantity: item.quantity,
        price: Number(item.price)  // Ensure price is a number
      }));
  
      const orderData = {
        restaurantId,
        totalAmount: Number(totalPrice),  // Convert total to number
        items: orderItems,
        paymentMethod: "Credit Card" // You may allow dynamic selection
      };
  
      const response = await axios.post("http://localhost:5000/api/orders", orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      // Clear cart on successful order
      localStorage.removeItem("cart");
      setCartItems([]);
      setTotalPrice(0);
  
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      console.error("Failed to place order:", error);
      alert(`Failed to place order: ${error.response?.data?.message || error.message}`);
    }
  };
  

  return (
    <div className="cart-page">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/dashboard" className="text-blue-500 underline">Browse Restaurants</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item._id} className="cart-item flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-3">
                {item.image && <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />}
                
                <div className="item-details flex-1 px-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                  <p className="text-green-600 font-semibold">${Number(item.price).toFixed(2)} each</p>
                </div>

                <div className="item-controls flex items-center">
                  <button className="bg-gray-300 px-2 rounded" onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button className="bg-gray-300 px-2 rounded" onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                </div>

                <div className="item-price text-lg font-bold">
                  ${(Number(item.price) * item.quantity).toFixed(2)}
                </div>

                <button 
                  onClick={() => removeItem(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded ml-4"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary mt-6 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Order Summary</h2>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button 
              onClick={placeOrder}
              className="bg-green-500 text-white px-4 py-2 mt-4 rounded w-full hover:bg-green-600 transition"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
