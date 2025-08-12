import React, { useContext } from 'react';
import './FeaturedProducts.css';
import { CartContext } from '../context/CartContext';

const featured = [
  {
    id: 1,
    name: "Gentle Foaming Cleanser",
    category: "skincare",
    brand: "CeraVe",
    price: 25,
    image: "https://cdn.nhathuoclongchau.com.vn/unsafe/https://cms-prod.s3-sgn09.fptcloud.com/DSC_00420_9eca1db0a1.jpg",
    description: "Mild, soap-free cleanser for all skin types."
  },
  {
    id: 2,
    name: "Vitamin C Brightening Serum",
    category: "skincare",
    brand: "The Ordinary",
    price: 20,
    image: "https://bizweb.dktcdn.net/thumb/1024x1024/100/379/640/products/ordinary-ascorbic-acid-alpha-arbutin-30ml-1024x1024.jpg?v=1583808360447",
    description: "Helps brighten skin and fade pigmentation."
  },
  {
    id: 3,
    name: "Hyaluronic Acid Moisturizer",
    category: "skincare",
    brand: "Neutrogena",
    price: 24,
    image: "https://images.ctfassets.net/bcjr30vxh6td/249vyCPCWOePqx9Reg2Y7O/217ce1ad98092d44f138083ad7a1e1c0/6811047_Carousel_1.webp",
    description: "Deep hydration without heaviness."
  }
];

export default function FeaturedProducts() {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="products-grid">
      {featured.map((item) => (
        <div className="product-card" key={item.id}>
          <img className="product-image" src={item.image} alt={item.name} />
          <h3 className="product-name">{item.name}</h3>
          <p className="product-brand">{item.brand}</p>
          <p className="product-price">${item.price.toFixed(2)}</p>
          <button
            className="add-to-cart-btn"
            onClick={() => addToCart(item)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}