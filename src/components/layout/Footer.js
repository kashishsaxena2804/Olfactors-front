import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='foot'>
      <div className='row'>
        <div className='col'>
          <img className='logo' src="./images/Olfactors.png" alt=""/>
          <p className='par'>
            Crafted with exquisite ingredients and an alchemist's touch, Olfactors invites you to paint your own olfactory masterpiece. Explore endless possibilities, one captivating scent at a time.
          </p>
        </div>
        <div className='col'>
          <h3>BEST SELLERS <div className='underline'><span></span> </div> </h3>
          <p className='para'>Ultimate Perfume Box</p>
          <p className='para'>Perfume Gifts Set For Men</p>
          <p className='para'>Perfume Gifts Set For Women</p>
          <p className='para'>Unisex Perfume</p>
        </div>
        <div className='col'>
          <h3>CONTACT US <div className='underline'><span></span> </div> </h3>
          <div className='social-icons'>
          <FaFacebookF className='fab'/>
          <FaTwitter className='fab'/>
          <FaPinterestP className='fab'/>
          <FaInstagram className='fab'/>
          <FaYoutube className='fab'/>
          <FaWhatsapp className='fab'/>
          </div>
        </div>
      </div>
      <div>
  <hr/>
  <p className='copyright'>Olfactors © 2024 - All Right Reserved </p>
  <p className='copyright'>Designed & Manage by Kashish Saxena</p>
  
</div>

    </div>
  )
}

export default Footer;
