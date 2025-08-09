import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No products in cart</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <div className="cart-quantity">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <h3 style={{ textAlign: "right", marginTop: "20px" }}>
            Total: ${totalPrice.toFixed(2)}
          </h3>
        </>
      )}
    </div>
  );
}