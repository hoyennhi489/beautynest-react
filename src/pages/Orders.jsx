import React, { useEffect, useState } from "react";
import "./Orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  const handleRemoveOrder = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const handleClearAll = () => {
    setOrders([]);
    localStorage.removeItem("orders");
  };

  return (
    <div className="orders-page">
      <h2 className="orders-title">My Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">You have not placed any orders yet.</p>
      ) : (
        <>
          {orders.map((order, index) => (
            <div className="order-card" key={order.id}>
              <div className="order-header">
                <p><strong>Order #{index + 1}</strong></p>
                <button
                  className="remove-order-btn"
                  onClick={() => handleRemoveOrder(order.id)}
                >
                  Remove Order
                </button>
              </div>
              <p><strong>Order Date:</strong> {order.date}</p>
              <p><strong>Total:</strong> ${order.total}</p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} x {item.quantity} (${item.price})
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="clear-all">
            <button className="clear-orders-btn" onClick={handleClearAll}>
              Clear All Orders
            </button>
          </div>
        </>
      )}
    </div>
  );
}