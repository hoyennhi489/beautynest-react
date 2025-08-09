import React, { useContext } from "react";
import "./Products.css";
import { CartContext } from "../context/CartContext";
import products from "../data/products";

const Products = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="products-page">
      <h1 className="products-title">All Products</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-brand">{product.brand}</p>
            <p className="product-price">${product.price}</p>
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
