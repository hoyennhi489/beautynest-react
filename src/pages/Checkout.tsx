import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Checkout.css";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  name: string;
  phone: string;
  address: string;
  payment: string;
  items: CartItem[];
  total: string;
  date: string;
  timestamp: number;
  status: string;
}

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext) as {
    cart: CartItem[];
    clearCart: () => void;
  };

  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [payment, setPayment] = useState<string>("Cash on Delivery (COD)");
  const [error, setError] = useState<string>("");

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleConfirm = (): void => {
    if (!name || !phone || !address) {
      setError("⚠️ Please fill in all required fields.");
      return;
    }

    if (!/^\d{10,11}$/.test(phone)) {
      setError("⚠️ Phone number must be 10–11 digits.");
      return;
    }

    const newOrder: Order = {
      id: Date.now(),
      name,
      phone,
      address,
      payment,
      items: cart,
      total: totalPrice.toFixed(2),
      date: new Date().toLocaleString(),
      timestamp: Date.now(),
      status: "Pending",
    };

    const existingOrders: Order[] =
      JSON.parse(localStorage.getItem("orders") || "[]");

    localStorage.setItem("orders", JSON.stringify([newOrder, ...existingOrders]));

    clearCart();
    localStorage.removeItem("cart");

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
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => {
            const onlyNums = e.target.value.replace(/\D/g, "");
            setPhone(onlyNums);
          }}
          maxLength={11}
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
              value="Cash on Delivery (COD)"
              checked={payment === "Cash on Delivery (COD)"}
              onChange={(e) => setPayment(e.target.value)}
            />
            Cash on Delivery (COD)
          </label>
          <label>
            <input
              type="radio"
              value="Credit/Debit Card"
              checked={payment === "Credit/Debit Card"}
              onChange={(e) => setPayment(e.target.value)}
            />
            Credit/Debit Card
          </label>
          <label>
            <input
              type="radio"
              value="E-Wallet"
              checked={payment === "E-Wallet"}
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