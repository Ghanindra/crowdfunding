import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './paymentpage.css'; // Link to the CSS
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PaymentPage = () => {
  const location = useLocation();
  const { fundraiser } = location.state || {}; // Get fundraiser data

  const [donationAmount, setDonationAmount] = useState(100); // Default donation amount
  const [tipAmount, setTipAmount] = useState(0); // Default tip amount
  const [paymentMethod, setPaymentMethod] = useState(''); // Track selected payment method

  const totalAmount = donationAmount + tipAmount; // Total amount due
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 7); // Example: due date is 7 days from now

  if (!fundraiser) {
    return <p>No fundraiser selected.</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="payment-container">
        {/* Single Section: Fundraiser and Payment Info */}
        <h1 className="payment-title">{fundraiser.title}</h1>
        <img
          src={`http://localhost:5000/${fundraiser.image}`}
          alt={fundraiser.title}
          className="payment-image"
        />
        
        <div className="amount-options">
          <h2>Select Donation Amount</h2>
          {[100, 200, 500, 1000].map((amount) => (
            <button
              key={amount}
              onClick={() => setDonationAmount(amount)}
              className={donationAmount === amount ? 'selected' : ''}
            >
              ${amount}
            </button>
          ))}
        </div>

        {/* Tips Section */}
        <div className="tip-section">
          <label>Optional Tip</label>
          <input
            type="number"
            value={tipAmount}
            onChange={(e) => setTipAmount(Number(e.target.value))}
            placeholder="Enter tip amount"
          />
        </div>

        {/* Payment Methods */}
        <div className="payment-methods">
          <h3>Payment Method</h3>
          <button
            className={`payment-button ${paymentMethod === 'Khalti' ? 'selected' : ''}`}
            onClick={() => setPaymentMethod('Khalti')}
          >
            Khalti
          </button>
          <button
            className={`payment-button ${paymentMethod === 'eSewa' ? 'selected' : ''}`}
            onClick={() => setPaymentMethod('eSewa')}
          >
            eSewa
          </button>
        </div>

        {/* Total Amount */}
        <div className="total-amount">
          <p>Donation Amount: ${donationAmount}</p>
          <p>Tip Amount: ${tipAmount}</p>
          <p>Total Due: ${totalAmount}</p>
          <p>Due Date: {dueDate.toLocaleDateString()}</p>
        </div>

        {/* Payment Button */}
        <button className="donate-now-button">Proceed to Pay</button>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;
