import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Checkout.css";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("cod");
  const [error, setError] = useState("");

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleConfirm = () => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError("⚠️ Please fill in all fields before confirming your order.");
      return;
    }
    if (!/^[0-9]{9,11}$/.test(phone)) {
      setError("⚠️ Phone number must be 9–11 digits.");
      return;
    }
    setError("");

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = {
      id: Date.now(),
      items: cart,
      total: totalPrice.toFixed(2),
      date: new Date().toLocaleString(),
      customer: { name, phone, address },
      payment,
    };
    localStorage.setItem("orders", JSON.stringify([newOrder, ...existingOrders]));

    clearCart();
    localStorage.removeItem("cart");

    alert("✅ Order placed successfully!");
    navigate("/orders");
  };

  return (
    <div className="checkout-page">
      <h2 className="checkout-title">Checkout</h2>

      {error && <p className="error-message">{error}</p>}

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

        <div className="payment-methods">
          <label>
            <input
              type="radio"
              value="cod"
              checked={payment === "cod"}
              onChange={(e) => setPayment(e.target.value)}
            />
            Cash on Delivery (COD)
          </label>
          <label>
            <input
              type="radio"
              value="card"
              checked={payment === "card"}
              onChange={(e) => setPayment(e.target.value)}
            />
            Credit/Debit Card
          </label>
          <label>
            <input
              type="radio"
              value="wallet"
              checked={payment === "wallet"}
              onChange={(e) => setPayment(e.target.value)}
            />
            E-Wallet
          </label>
        </div>

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