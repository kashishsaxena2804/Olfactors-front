import React from 'react'
import Layout from '../components/layout/Layout'
import  "../styles/Terms&conditions.css";

const Refundreturnpolicy= () => {
    const handleLinkClick = () => {
        window.location.href = 'https://www.olfactors.in';
      };
  return (
    <Layout>
      <div className='tccontainer'>
        <div className='tccontent'>
      <h1 className='heading'>Refund & Return Policy</h1>

      <h2>Eligibility for a Refund And Returns Policy</h2>
      <p><strong>To qualify for our Refund and Returns Policy, your item must meet the following criteria:</strong></p>

      <ol>
        <li>Returns are not accepted for products that have been used. If the item has been opened, it must still contain 95% or more of the original liquid in the bottle to be eligible for return.</li>
        <li>If the product is damaged during transit or delivery, we will happily offer you either an exchange or a refund.</li>
        <li>Damages resulting from neglect, improper usage, or incorrect application are not covered under this policy.</li>
        <li>Once your return or refund request has been accepted by the Olfactors Team, the process will be completed within 7 working days.</li>
        <li>We require prior notification of any returns before accepting them.</li>
        <li>If you are not completely satisfied with our products, we offer a refund option.</li>
        <li>If you cancel your order before it is dispatched, we will refund the entire amount.</li>
        <li>For cancellations after your product has been shipped but not delivered, the original courier cost and payment processing fees will be deducted from your refund.</li>
        <li>We are pleased to offer returns and exchanges within 5 days as part of our Satisfaction Guarantee policy.</li>
      </ol>

      </div>
    </div>

    </Layout>
  )
}

export default Refundreturnpolicy;
