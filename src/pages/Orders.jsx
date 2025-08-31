import React, { useEffect, useState } from "react";
import "./Orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  // Giả lập cập nhật trạng thái: sau 15 giây chuyển từ Pending -> Completed
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prevOrders) => {
        const updated = prevOrders.map((order) => {
          if (order.status === "Pending") {
            if (Date.now() - order.timestamp > 15000) { // 15 giây
              return { ...order, status: "Completed" };
            }
          }
          return order;
        });
        localStorage.setItem("orders", JSON.stringify(updated));
        return updated;
      });
    }, 5000); // check mỗi 5 giây

    return () => clearInterval(interval);
  }, []);

  // Xóa 1 đơn hàng
  const handleRemoveOrder = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  // Hủy đơn hàng
  const handleCancelOrder = (id) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: "Cancelled" } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  // Xóa tất cả đơn hàng
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
                <p>
                  <strong>Order #{index + 1}</strong>
                </p>
                <div className="order-actions">
                  {order.status === "Pending" && (
                    <button
                      className="cancel-order-btn"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      Cancel Order
                    </button>
                  )}
                  <button
                    className="remove-order-btn"
                    onClick={() => handleRemoveOrder(order.id)}
                  >
                    Remove Order
                  </button>
                </div>
              </div>

              <p>
                <strong>Order Date:</strong> {order.date}
              </p>
              <p>
                <strong>Total:</strong> ${order.total}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </p>
              <p className="payment">
                <strong>Payment:</strong> {order.payment}
              </p>

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