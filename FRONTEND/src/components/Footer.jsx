import React from 'react'
import './footer.css'
const Footer = () => {
  return (
    <div>
      <footer className="footer">
  <div className="footer-container">
    <div className="footer-section">
      <h3>About Us</h3>
      <p>We are a trusted crowdfunding platform dedicated to turning great ideas into reality. Join our community and make a difference today.</p>
    </div>
    <div className="footer-section">
      <h3>Quick Links</h3>
      <ul>
        <li><a href="/about">About Us</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/terms">Terms & Conditions</a></li>
        <li><a href="/privacy">Privacy Policy</a></li>
      </ul>
    </div>
    <div className="footer-section">
      <h3>Stay Connected</h3>
      <p>Follow us on our social media channels:</p>
      <div className="social-icons">
      <a href="https://www.facebook.com/crowdfunding" className="social-icon facebook" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com/crowdfunding" className="social-icon twitter" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
              <a href="https://www.instagram.com/crowdfunding" className="social-icon instagram" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
              <a href="https://www.linkedin.com/company/crowdfunding" className="social-icon linkedin" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
      </div>
    </div>
  </div>
  <div className="footer-bottom">
    <p>&copy; 2024 Crowdfunding. All rights reserved.</p>
  </div>
</footer>

    </div>
  )
}

export default Footer
