import React from 'react'
import Layout from '../components/layout/Layout'
import  "../styles/Terms&conditions.css";

const Shippingpolicy= () => {
    const handleLinkClick = () => {
        window.location.href = 'https://www.olfactors.in';
      };
  return (
    <Layout>
      <div className='tccontainer'>
        <div className='tccontent'>
      <h1 className='heading'>Shipping Policy</h1>
      <p><strong>Thank you for choosing Olfactors for your fragrance needs. Our Shipping Policy is designed to ensure a smooth and satisfactory shopping experience for you. By placing an order on our website, you agree to adhere to the following shipping guidelines:</strong></p>

      <h2>Domestic Delivery & Shipping Policy</h2>
      <p>We aim to deliver domestic orders across India within 7 business days.</p>

      <h2>International Delivery & Shipping Policy</h2>
      <p>Currently, we do not offer international delivery. However, if any customer expresses interest in purchasing our products internationally, they would be subject to customer duties, shipping charges, and insurance if required, which the customer will need to cover to receive the package.</p>

      <h2>Delivery Time</h2>
      <ul>
      <li>Orders will be processed within 24-48 business hours from our warehouse.</li>
      <li>You can expect to receive your order within 3-4 days, excluding weekends, holidays, or any other delays caused by the courier company.</li>
      <li>While we strive to expedite your order, we are not responsible for delays caused by the courier company.</li>
      <li>Delivery fees are non-refundable and will be displayed during checkout before payment submission.</li>
      </ul>

      <h2>Delivery Schedule</h2>
      <ul>
      <li>Orders will be delivered between 9 am – 8 pm, Monday to Saturday.</li>
      <li>Deliveries require a signature upon receipt. If you're unavailable, please provide an alternative recipient.</li>
      <li>For canceled orders in transit or rejected COD orders, shipping costs will be charged for both to & fro at actuals.</li>
      </ul>
      
        
      <h2>Shipping Details</h2>
      <ul>
      <li>All purchases are shipped from our warehouse in Lucknow,Uttar Pradesh, via reputable courier agencies.</li>
      <li>Claims for shortages or damages must be reported to customer service on the day of delivery.</li>
      <li>Shipping charges may apply for bulk orders based on product, packaging, size, volume, type, and other considerations.</li>
      </ul>
         
      <h2>Returns</h2>
      <ul>
      <li>Returns are easy. Contact us to initiate a return. For replacement and refund policies, please reach out to us at <a className='email-link' href="mailto:theolfactors@gmail.com">theolfactors@gmail.com</a>.</li>
      </ul>
      <p>By placing an order with Olfactors, you acknowledge that you have read and understood our Shipping Policy and agree to its terms. We are dedicated to delivering your purchases promptly while providing top-quality products and exceptional customer service.</p>

      </div>
    </div>

    </Layout>
  )
}

export default Shippingpolicy;
