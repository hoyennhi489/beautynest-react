import React, { useState } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubscribe = () => {
    if (email.trim() === "") {
      alert("Please enter your email!");
      return;
    }
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <h3>Subscribe to Our Newsletter</h3>
        <div className="subscribe-form">
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSubscribe}>Subscribe</button>
        </div>
        {success && (
          <div className="subscribe-success">✅ Subscription successful!</div>
        )}
      </div>

      <div className="social-icons">
        <a href="#"><i className="fab fa-facebook-f"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-tiktok"></i></a>
      </div>

      <div className="footer-links">
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </div>

      <p className="copyright">© 2025 Beautynest. All rights reserved.</p>
    </footer>
  );
};

export default Footer;