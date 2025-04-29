import React from 'react';
import './HowToDonate.css'; // Import the CSS

const HowToDonate = () => {
  return (
    <div className="donate-container">
      <h1 className="donate-title">How to Donate</h1>

      <ol className="donate-steps">
        <li><strong>Browse Campaigns:</strong> Explore campaigns that matter to you.</li>
        <li><strong>Select a Campaign:</strong> Click on a campaign to view details.</li>
        <li><strong>Click "Donate":</strong> Press the donate button on the campaign page.</li>
        <li><strong>Enter Your Details:</strong> Fill in your name, donation amount, and message.</li>
        <li><strong>Submit Donation:</strong> Confirm payment and complete your donation.</li>
        <li><strong>Get Confirmation:</strong> Receive a thank-you message or confirmation email.</li>
      </ol>

      <div className="donate-tips">
        <p><strong>Tips:</strong></p>
        <ul>
          <li>You can donate anonymously.</li>
          <li>Every contribution makes a difference.</li>
          <li>Check the campaign goal and deadline before donating.</li>
        </ul>
      </div>
    </div>
  );
};

export default HowToDonate;
