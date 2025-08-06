import React from "react";
import products from "../data/products";
import "./Products.css";

export default function Products() {
  return (
    <div>
      <h2>Our Products</h2>
      <div className="product-grid">
        {products.map((item) => (
          <div className="product-card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p className="description">{item.description}</p>
            <p className="price">${item.price.toFixed(2)}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}