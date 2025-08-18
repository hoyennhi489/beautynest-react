import React, { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="orders-page">
      <h2 className="orders-title">My Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">You have not placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order.id}>
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
        ))
      )}
    </div>
  );
}