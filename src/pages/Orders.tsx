import React, { useEffect, useState } from "react";
import "./Orders.css";

type OrderItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type Order = {
  id: number;
  date: string;
  payment: string;
  name: string;
  phone: string;
  address: string;
  items: OrderItem[];
  total: number;
  timestamp?: number;
  status: "Pending" | "Completed" | "Cancelled";
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  useEffect(() => {
    const savedOrders = (JSON.parse(localStorage.getItem("orders") || "[]") as Order[]).map(
      (order) => ({
        ...order,
        status: order.status as "Pending" | "Completed" | "Cancelled",
      })
    );
    setOrders(savedOrders);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prevOrders) => {
        const updated = prevOrders.map((order) => {
          if (order.status === "Pending" && order.timestamp) {
            if (Date.now() - order.timestamp > 15000) {
              return { ...order, status: "Completed" as const };
            }
          }
          return order;
        });
        localStorage.setItem("orders", JSON.stringify(updated));
        return updated;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRemoveOrder = (id: number) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const handleCancelOrder = (id: number) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: "Cancelled" as const } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const handleClearAll = () => {
    setOrders([]);
    localStorage.removeItem("orders");
  };

  const toggleExpand = (id: number) => {
    setExpandedOrder(expandedOrder === id ? null : id);
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
              <div
                className="order-header clickable"
                onClick={() => toggleExpand(order.id)}
              >
                <p>
                  <strong>Order #{index + 1}</strong>{" "}
                  <span
                    className={`status ${
                      order.status ? order.status.toLowerCase() : ""
                    }`}
                  >
                    {order.status || "Unknown"}
                  </span>
                </p>
                <div className="order-actions">
                  {order.status === "Pending" && (
                    <button
                      className="cancel-order-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCancelOrder(order.id);
                      }}
                    >
                      Cancel Order
                    </button>
                  )}
                  <button
                    className="remove-order-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveOrder(order.id);
                    }}
                  >
                    Remove Order
                  </button>
                </div>
              </div>

              {expandedOrder === order.id && (
                <div className="order-details">
                  <p>
                    <strong>Order Date:</strong> {order.date}
                  </p>
                  <p className="payment">
                    <strong>Payment:</strong> {order.payment}
                  </p>

                  <div className="shipping-info">
                    <p className="shipping-title">Shipping Address</p>
                    <div className="shipping-row">
                      <span className="shipping-icon">📍</span>
                      <span className="shipping-name">{order.name}</span>
                      <span className="shipping-phone">({order.phone})</span>
                    </div>
                    <p className="shipping-address">{order.address}</p>
                  </div>

                  <div className="order-items">
                    {order.items.map((item) => (
                      <div className="order-item" key={item.id}>
                        <img
                          src={item.image || "https://via.placeholder.com/60"}
                          alt={item.name}
                          className="item-image"
                        />
                        <div className="item-info">
                          <p className="item-name">{item.name}</p>
                          <p className="item-qty">
                            x{item.quantity} | ${item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order-total">
                    <span>Order Total:</span>
                    <strong>${order.total}</strong>
                  </div>
                </div>
              )}
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