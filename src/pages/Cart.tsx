import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("CartContext is not available — please wrap your app with CartProvider.");
  }

  const { cart, removeFromCart, updateQuantity, setCart } = cartContext;
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [setCart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">No products in cart</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-header">
                <h3>{item.name}</h3>
                <span className="cart-item-price">${item.price}</span>
              </div>
              <div className="cart-controls">
                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <div className="summary-text">
              <strong>Total:</strong> ${totalPrice.toFixed(2)}
            </div>
            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Order Now
            </button>
          </div>
        </>
      )}
    </div>
  );
}