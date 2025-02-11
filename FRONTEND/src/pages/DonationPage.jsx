import React from "react";
import { useLocation } from "react-router-dom";
import "./donationpage.css"; // Link to CSS
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';
const DonationPage = () => {
  const location = useLocation();
  const { fundraiser } = location.state || {}; // Get fundraiser data
  const navigate = useNavigate();
  if (!fundraiser) {
    return <p>No fundraiser selected.</p>;
  }

  const progress = (fundraiser.raisedAmount / fundraiser.targetAmount) * 100; // Calculate progress

  const handleDonateClick = () => {
    navigate('/donationpage/payment', { state: { fundraiser } }); // Pass fundraiser data to the PaymentPage
  };
  return (
    <div>
      <Navbar />
      <div className="donation-container">
        {/* Left Section */}
        <div className="donation-left">
          <h1 className="donation-title">{fundraiser.title}</h1>
          <img
            src={`http://localhost:5000/${fundraiser.image}`}
            alt={fundraiser.title}
            className="donation-image"
          />
          <p className="donation-description">{fundraiser.description}</p>
          <hr/> <hr/>
          <div className="information">
    <p className='info'>Support for Vishnu Chaitanya Kosaraju’s Family: Helping to send him Home & Provide Support for His Loved Ones

It is with deep sadness that we share the untimely passing of our beloved friend, Vishnu with massive heart stroke.<br/><br/> He leaves behind his loving wife, Sowjanya, and their precious baby girl, Saanvi. This tragedy has left their world turned upside down, and we are coming together to help them through this incredibly difficult time.

Vishnu was a devoted husband, father, and friend, always there for those who needed him. His passing has not only created an emotional void but has also placed a significant financial burden on his family.

<br/><br/>In addition to covering these transportation costs, we want to ensure that his wife and daughter receive the support they need to cope with this devastating loss and move forward.

We kindly ask for your support during this challenging time.<br/><br/> Your donations will go directly toward providing financial assistance for Sowjanya and their baby girl as they navigate life without him. Every contribution, no matter how small, will make a meaningful difference to this family as they try to heal.

If you cannot contribute financially, please consider sharing this campaign with others. We are deeply grateful for your support, prayers, and kindness during this heartbreaking time. Thank you for being part of Vishnu Chaitanya Kosaraju’s legacy and showing his family they are not alone.</p>
</div>
        </div>

        {/* Right Section */}
        <div className="donation-right">
          <p className="donation-amount">${fundraiser.raisedAmount} USD raised</p>
          <p className="donation-goal">${fundraiser.targetAmount} goal</p>
          
          {/* Progress Bar */}
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>

          {/* Action Buttons */}
          <div className="donation-actions">
            <button className="donate-button"onClick={handleDonateClick}>Donate Now</button>
            <button className="share-button">Share</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DonationPage;
