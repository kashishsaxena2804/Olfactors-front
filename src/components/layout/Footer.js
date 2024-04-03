import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
        <img className="foot-logo" src="./images/Olfactors.png" alt="Olfactors Logo" />
          <p className="footer-content">
          Crafted with exquisite ingredients and an alchemist's touch, Olfactors invites you to paint your own olfactory masterpiece. Explore endless possibilities, one captivating scent at a time.
          </p>
          
        </div>
        <div className="footer-section">
          <h3 className="footer-heading">Account</h3>
          <ul className="footer-list">
            <li className="footer-item">
            <Link to="/login" className="footer-link">Sign In</Link>
            </li>
            <li className="footer-item">
              <Link to={`/dashboard/${
                            useAuth?.user?.role === 1 ? "admin" : "user"
                          }`} className="footer-link">
                Account
              </Link>
            </li>  
            <li className="footer-item">
              <Link to = "/cart" className="footer-link">
                Cart
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-heading">Category</h3>
          <ul className="footer-list">
            <li className="footer-item">
              <a href="#" className="footer-link">
                Perfumes
              </a>
            </li>
            <li className="footer-item">
              <a href="#" className="footer-link">
                Attars
              </a>
            </li>
            <li className="footer-item">
              <a href="#" className="footer-link">
                Diffuser Oils
              </a>
            </li>
            <li className="footer-item">
              <a href="#" className="footer-link">
                Gift Hampers
              </a>
            </li>
            <li className="footer-item">
              <a href="#" className="footer-link">
                Air Freshners
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          
          <p className="footer-content">
            <a href="mailto:connect@aranyamperfumes.com" className="footer-link">
              theolfactors@gmail.com
            </a>
          </p>
          <p className="footer-content">
            Lucknow, Uttar Pradesh, India.
          </p>
        </div>
      </div>
      <div className="footer-copyright">
        <p className="footer-text">
          Copyright 2024 Olfactors Premium Perfumes. All Rights Reserved.
        </p>
        <p className="copyright">
  Designed & Managed  by
  <a className="kas" href="https://www.linkedin.com/in/kashish-saxena" target="_blank" rel="noopener noreferrer">
     Kashish Saxena
  </a>
</p>

      </div>
    </footer>
  );
};

export default Footer;
