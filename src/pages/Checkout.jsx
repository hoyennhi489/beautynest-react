import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleConfirm = () => {
    if (!name || !phone || !address) {
      alert("Please fill all fields!");
      return;
    }

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: Date.now(),
      items: cart,
      total: totalPrice.toFixed(2),
      date: new Date().toLocaleString(),
      customer: { name, phone, address }
    };

    localStorage.setItem("orders", JSON.stringify([newOrder, ...existingOrders]));
    clearCart();
    localStorage.removeItem("cart");

    navigate("/orders");
  };

  return (
    <div className="checkout-page">
      <h2 className="checkout-title">Checkout</h2>
      <div className="checkout-form">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          placeholder="Shipping Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="checkout-summary">
          <strong>Total:</strong> ${totalPrice.toFixed(2)}
        </div>
        <button className="confirm-btn" onClick={handleConfirm}>
          Confirm Order
        </button>
      </div>
    </div>
  );
}