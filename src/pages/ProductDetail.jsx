import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import { CartContext } from "../context/CartContext";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="product-detail">
      {/* ✅ lấy ảnh đúng từ thư mục public (có basename beautynest-react) */}
      <img
        src={`${import.meta.env.BASE_URL}${product.image}`}
        alt={product.name}
        className="detail-image"
      />
      <div className="detail-info">
        <h2>{product.name}</h2>
        <p className="detail-brand">{product.brand}</p>
        <p className="detail-price">${product.price}</p>
        <p className="detail-desc">
          {product.description || "No description available."}
        </p>
        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}