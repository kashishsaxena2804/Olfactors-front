import React from 'react';
import { FaFacebookF, FaTwitter, FaPinterestP, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="row">
        <div className="col">
          <img className="logo" src="./images/Olfactors.png" alt="Olfactors Logo" />
          <p className="par">
            Crafted with exquisite ingredients and an alchemist's touch, Olfactors invites you to paint your own olfactory masterpiece. Explore endless possibilities, one captivating scent at a time.
          </p>
        </div>

        <div className="col">
          <h3>BEST SELLERS</h3>
          <div className="underline"><span></span></div>

          <ul>
            <li>Ultimate Perfume Box</li>
            <li>Perfume Gifts Set For Men</li>
            <li>Perfume Gifts Set For Women</li>
            <li>Unisex Perfume</li>
          </ul>
        </div>

        <div className="col">
          <h3>CONTACT US</h3>
          <div className="underline"><span></span></div>

          <div className="social-icons">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="fab" />
            </a>
            <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="fab" />
            </a>
            <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer">
              <FaPinterestP className="fab" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="fab" />
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="fab" />
            </a>
            <a href="https://www.whatsapp.com/" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="fab" />
            </a>
          </div>
        </div>
      </div>

      <hr />

      <div className="copyright-container">
        <p className="copyright">© 2024 Olfactors. All Rights Reserved.</p>
        <p className="copyright">Designed & Managed by Kashish Saxena</p>
      </div>
    </footer>
  );
};

export default Footer;
