import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import "./App.css";
import Orders from "./pages/Orders";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="container header-content">
            <h1 className="logo">
              <Link to="/">Beautynest</Link>
            </h1>
            <nav className="nav">
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/orders">Orders</Link>
            </nav>
          </div>
        </header>

        <main className="container main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}