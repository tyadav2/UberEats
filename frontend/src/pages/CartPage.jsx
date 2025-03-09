import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CartPage({ cart, setCart }) {
  const navigate = useNavigate();

  const placeOrder = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("customerToken"));

      await axios.post(
        "http://localhost:5000/api/orders",
        { items: cart, totalAmount: cart.reduce((total, item) => total + item.price, 0) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Order placed successfully!");
      setCart([]);
      navigate("/orders");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty.</p> : cart.map((item) => (
        <div key={item.id}>
          <p>{item.name} - ${item.price}</p>
        </div>
      ))}
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}

export default CartPage;
