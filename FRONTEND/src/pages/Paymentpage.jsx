import React, { useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './paymentpage.css'; // Link to the CSS
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { generateUniqueId } from "esewajs";
import axios from 'axios';
import { toast } from "react-toastify";
const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fundraiser,campaignId } = location.state || {}; // Get fundraiser data
  // const storedCampaignId = localStorage.getItem("campaignId"); // Fallback from storage
  const [donationAmount, setDonationAmount] = useState(0); // Default donation amount
  const [tipAmount, setTipAmount] = useState(0); // Default tip amount
  const [paymentMethod, setPaymentMethod] = useState(''); // Track selected payment method

  const [userId, setUserId] = useState(''); // Initialize userId state
  // console.log("Stored Campaign ID:", storedCampaignId); // Debugging
   // Ensure we have a campaignId
   const activeCampaignId = campaignId || fundraiser?._id;  // Use the campaignId from state, or fallback to fundraiser._id
   console.log("Campaign ID:", activeCampaignId);
 
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user", {
          method: "GET",
          headers: { 
               "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("auth-token")}` // Assuming JWT is stored in localStorage
          }
        });
        console.log("Stored Token:", localStorage.getItem("auth-token"));

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("User Data:", data); // Debugging
        setUserId(data.userId); // Ensure your backend sends `userId`
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
  
    fetchUserId();
  }, []);
  
  const totalAmount = donationAmount + tipAmount; // Total amount due
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 7); // Example: due date is 7 days from now

  if (!fundraiser) {
    return <p>No fundraiser selected.</p>;
  }
  
  const handlePayment = async (e) => {
    e.preventDefault(); // Ensure the page doesn't refresh
    
    if (paymentMethod === "eSewa") {
      console.log('eSewa selected');
  

    console.log('Proceed to pay clicked');
    
    if (!paymentMethod) {
      toast.info("Please select a payment method.");
      return;
    }

  // if (!storedCampaignId) {
  //   toast.error("Campaign ID is missing. Please try again.");
  //   return;
  // }
  
      try {
        // Payment initiation call
        const response = await axios.post(
          "http://localhost:5000/initiate-payment", // server payment route
          {
            amount: totalAmount, // send the total amount to the server
            productId: generateUniqueId(),
            campaignId:activeCampaignId// Use stored campaign ID
          }
        );
    // The server should return a URL to redirect the user for payment.
        // Append the campaignId as a query parameter to the success URL.
        const redirectUrl = new URL(response.data.url);

       
        console.log("Payment initiated successfully, redirecting...");
        
        setTimeout(() => {
          window.location.href = redirectUrl.toString();
        }, 1000); // 3-second delay for debugging
        // window.location.href = response.data.url; // Redirect to payment URL

     
      } catch (error) {
        console.error("Error initiating payment:", error);
        toast.error("There was an error processing your payment.");
      }
    } else {
      toast.info("Please select eSewa as the payment method to proceed.");
    }
  };
 

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
        <button
  type="button"  // Ensure it's a button, not a submit button
  className="donate-now-buttons"
  onClick={handlePayment}
>
  Proceed to Pay
</button>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;


// 9806800001