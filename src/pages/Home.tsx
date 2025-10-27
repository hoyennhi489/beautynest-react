import React from "react";
import { Link } from "react-router-dom";
import FeaturedProducts from "../pages/FeaturedProducts";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Beautynest</h1>
        <Link to="/products" className="shop-btn">
          Shop Now
        </Link>
      </section>

      <section className="featured-section">
        <h2>Featured Products</h2>
        <FeaturedProducts />
      </section>
    </div>
  );
};

export default Home;