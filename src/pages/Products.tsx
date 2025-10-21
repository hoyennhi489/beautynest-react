import React, { useContext } from "react";
import "./Products.css";
import { CartContext } from "../context/CartContext";
import products, { Product } from "../data/products";  // ✅ import đúng type
import { Link } from "react-router-dom";

const Products: React.FC = () => {
  const { addToCart } = useContext(CartContext)!; // ✅ thêm "!" nếu context không undefined

  return (
    <div className="products-page">
      <h1 className="products-title">All Products</h1>
      <div className="products-grid">
        {products.map((product: Product) => (
          <div className="product-card" key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img src={product.image} alt={product.name} className="product-image" />
            </Link>
            <h3 className="product-name">
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </h3>
            <p className="product-brand">{product.brand}</p>
            <p className="product-price">${product.price}</p>
            <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;