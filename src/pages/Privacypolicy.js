import React from 'react'
import Layout from '../components/layout/Layout'
import  "../styles/Terms&conditions.css";

const Privacypolicy= () => {
    const handleLinkClick = () => {
        window.location.href = 'https://www.olfactors.in';
      };
  return (
    <Layout>
      <div className='tccontainer'>
        <div className='tccontent'>
      <h1 className='heading'>Privacy Policy</h1>
      <p><strong>Effective Date: 04th September 2020</strong></p>

      <p>Olfactors is the owner of certain trademarks, service marks, trade names, and logos (collectively, the ‘Olfactors’). We are committed to protecting the privacy and security of the personal information of our website visitors and customers. This Privacy Policy outlines how we collect, use, disclose, and protect the information we collect through our website  <a className='email-link' href="#" onClick={handleLinkClick}>Olfactors.in</a> (“hereafter referred to as Website”). By accessing or using our website, you agree to the terms of this Privacy Policy.</p>
      <p>By using the <a className='email-link' href="#" onClick={handleLinkClick}>Olfactors.in</a> and/or registering yourself on our website, you authorize Olfactors (including its authorized representatives and its business partners) to contact you via email or phone call, or SMS and offer you our services for the product you have opted for, imparting product knowledge, offer promotional offers running on the Website (to the extent permissible), for which reasons your information may be collected in the manner as detailed under this Policy.</p>


      <h2>Information We Collect:</h2>
      <p><h5>Personal Information:</h5> We may collect personal information that you voluntarily provide to us, such as your name, email address, postal address, phone number, and payment information when you make a purchase or contact us through our website.</p>
      <p><h5>Non-Personal Information:</h5> We may collect non-personal information such as your IP address, browser type, operating system, and cookies when you visit our website. This information analyzes trends, administers the site, tracks users’ movements, and gathers demographic information.</p>

      <h2>Use of Information:</h2>
      <p><h5>Personal Information:</h5> We use personal information to fulfill orders, process payments, communicate with you, respond to inquiries, and provide customer support. We may also use your information to send you promotional emails or newsletters, but you can opt out of receiving such communications.</p>
      <p><h5>Non-Personal Information:</h5> Non-personal information is used for internal purposes, such as analyzing website usage patterns and improving our services. This information may also be shared with third parties for marketing and analytics purposes, but it does not identify you personally.</p>

      <h2>Disclosure of Information:</h2>
      <p><h5>Service Providers:</h5>We may share your personal information with trusted third-party service providers who assist us in operating our business, such as payment processors, shipping partners, and email service providers. Confidentiality obligations bind these service providers and are only permitted to use your information to provide services to us.</p>
      <p><h5>Legal Requirements:</h5> We may disclose your information if required by law, court order, or governmental regulation or if we believe disclosure is necessary to protect our rights, property, or safety, or that of others.</p>

      <h2>Cookies:</h2>
      <p>Our website may use cookies and similar technologies to enhance user experience, personalize content, track user activity, and gather information about visitors. You can manage your cookie preferences through your browser settings.</p>

      <h2>Security:</h2>
      <p>We take reasonable measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the Internet or electronic storage is 100% secure. Therefore, while we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>
            
      <h2>Links to Third-Party Websites:</h2>
      <p>We attempt to be as accurate as possible when describing our products on the website. However, except to the extent implied by applicable law, we do not warrant that the product descriptions, colors, information, or other content available on the website are accurate, complete, reliable, current, or error-free.</p>

      <h2>Children’s Privacy:</h2>
      <p>Our website is not directed toward individuals under the age of 13. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please get in touch with us, and we will delete such information from our records.</p>
      
      <h2>Changes to the Privacy Policy:</h2>
      <p>We may update this Privacy Policy occasionally to reflect changes in our practices or applicable laws. We will post the revised version with an updated effective date on our website. We encourage you to review the Privacy Policy periodically for any changes. This Privacy Policy is published in compliance with the Information Technology Act, 2000; and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Information) Rules, 2011 (the “SPDI Rules”) as amended from time to time.</p>
      
      <h2>Contact Us:</h2>
      <p>If you have any questions, concerns, or requests regarding this privacy policy or our privacy practices, please get in touch with us at  <a className='email-link' href="mailto:theolfactors@gmail.com">theolfactors@gmail.com</a>.</p>

      <p>Please note that this Privacy Policy applies solely to information collected through our website and does not apply to information collected offline or through other channels. By using our website, you consent to collecting, using, and disclosing your information as described in this Privacy Policy.</p>

      </div>
    </div>

    </Layout>
  )
}

export default Privacypolicy;
