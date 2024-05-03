import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const Footer = () => {
  const { user } = useAuth();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
        <Link to="/" onClick={scrollToTop} className="navbar-brand">
            <img className="foot-logo" src="/images/Olfactors.png" alt="Logo" />
          </Link>
          <p className="footer-content">
            Crafted with exquisite ingredients and an alchemist's touch, Olfactors invites you to paint your own olfactory masterpiece. Explore endless possibilities, one captivating scent at a time.
          </p>
        </div>
        <div className="footer-section">
          <h3 className="footer-heading">Account</h3>
          <ul className="footer-list">
            <li className="footer-item">
              <Link to="/login" className="footer-link" onClick={scrollToTop}>Sign In</Link>
            </li>
            <li className="footer-item">
              <Link to="/register" className="footer-link" onClick={scrollToTop}>Register</Link>
            </li>
            <li className="footer-item">
              <Link to={`/dashboard/${user?.role === 1 ? "admin" : "user"}`} className="footer-link" onClick={scrollToTop}>Account</Link>
            </li>
            <li className="footer-item">
              <Link to="/cart" className="footer-link" onClick={scrollToTop}>Cart</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-heading">Category</h3>
          <ul className="footer-list">
            <li className="footer-item">
              <Link to="/category/perfumes" className="footer-link" onClick={scrollToTop}>Perfumes</Link>
            </li>
            <li className="footer-item">
              <Link to="/category/attars" className="footer-link" onClick={scrollToTop}>Attars</Link>
            </li>
            <li className="footer-item">
              <Link to="/category/diffuser-oils" className="footer-link" onClick={scrollToTop}>Diffuser Oils</Link>
            </li>
            <li className="footer-item">
              <Link to="/category/gift-hampers" className="footer-link" onClick={scrollToTop}>Gift Hampers</Link>
            </li>
            <li className="footer-item">
              <Link to="/category/air-freshners" className="footer-link" onClick={scrollToTop}>Air Fresheners</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-list">
            <li className="footer-item">
              <Link to="/terms&conditions" className="footer-link" onClick={scrollToTop}>Terms & Conditions</Link>
            </li>
            <li className="footer-item">
              <Link to="/privacypolicy" className="footer-link" onClick={scrollToTop}>Privacy Policy</Link>
            </li>
            <li className="footer-item">
              <Link to="/shippingpolicy" className="footer-link" onClick={scrollToTop}>Shipping Policy</Link>
            </li>
            <li className="footer-item">
              <Link to="/refundreturnpolicy" className="footer-link" onClick={scrollToTop}>Refund & Returns Policy</Link>
            </li>
            <li className="footer-item">
              <Link to="/satisfactionguarantee" className="footer-link" onClick={scrollToTop}>Satisfaction Guarantee</Link>
            </li>
            <li className="footer-item">
              <Link to="/disclaimer" className="footer-link" onClick={scrollToTop}>Disclaimer</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
    <div class="flex-container">
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 14 14">
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4.5 4L7 6.5L9.5 4M7 .5v6"/>
        <path d="M12 4.5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1"/>
        <path d="M1 5.76L7 10l6-4.24"/>
    </g>
</svg>
        <h4 className="footer-heading1">Have Doubts?</h4>
    </div>
    <p className="footer-content">
        <a href="mailto:theolfactors@gmail.com" className="footer-link">theolfactors@gmail.com</a>
    </p>

    <div class="flex-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 14 14">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3.519 6.746a1.75 1.75 0 1 0 3.5 0a1.75 1.75 0 1 0-3.5 0"/>
                <path d="M9.629 8.74c-.948 2.542-3.366 4.756-4.36 4.756c-1.25 0-4.75-3.5-4.75-6.75a4.75 4.75 0 0 1 5.19-4.73M7.696 3.77c-.334-.059-.334-.538 0-.596a3.02 3.02 0 0 0 2.433-2.33l.02-.092c.072-.33.542-.331.617-.002l.024.107a3.036 3.036 0 0 0 2.44 2.316c.335.058.335.54 0 .598a3.036 3.036 0 0 0-2.44 2.316l-.024.107c-.075.329-.545.327-.617-.003l-.02-.092a3.02 3.02 0 0 0-2.433-2.33Z"/>
            </g>
        </svg>
        <h4 className="footer-heading1">Find Us At</h4>
    </div>
    <p className="footer-content">2/111 sector 2 Janakpuram Extension, Lucknow, Uttar Pradesh, India, 226021.</p>
    <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.089301278011!2d80.93728899999999!3d26.932383299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3999575fa48a0225%3A0x464d97c71bbbfb87!2sOlfactors!5e0!3m2!1sen!2sin!4v1713388578103!5m2!1sen!2sin" 
        width="200" 
        height="200" 
        style={{ border: 0 }} 
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade"
        title="Google Maps"
      />
</div>


      </div>
      <div className="footer-copyright">
        <p className="footer-text">
          Copyright 2024 Olfactors Premium Perfumes. All Rights Reserved.
        </p>
        <p className="copyright">
          Designed & Managed by
          <a className="kas" href="https://www.linkedin.com/in/kashish-saxena" target="_blank" rel="noopener noreferrer">
            Kashish Saxena
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
