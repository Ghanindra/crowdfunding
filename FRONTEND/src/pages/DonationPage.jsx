import React from "react";
import { useLocation ,useParams} from "react-router-dom";
import  { useState, useEffect } from "react"; // Import useState and useEffect

import "./donationpage.css"; // Link to CSS
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';

const DonationPage = () => {
  const [raisedAmount, setRaisedAmount] = useState(0);
  // const { campaignId } = useParams(); // Get campaignId from the URL
  // console.log("Campaign ID from useParams:", campaignId); // Debugging log
  const location = useLocation();
  // const storedCampaignId = localStorage.getItem("campaignId"); // Fallback from storage
  const { fundraiser,campaignId } = location.state || {}; 
  
  const activeCampaignId = campaignId || fundraiser?._id;  // Use the campaignId from state, or fallback to fundraiser._id
  console.log("Campaign ID:", activeCampaignId);
  const navigate = useNavigate();
  console.log("Fundraiser Data:", fundraiser);
  useEffect(() => {
    const fetchRaisedAmount = async () => {
      try {
        if (!activeCampaignId) return;
        const response = await fetch(`http://localhost:5000/api/update-raised-amount`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ campaignId:activeCampaignId }), // send the campaignId in the request body
        });
        const data = await response.json();
        if (data.success && data.updatedCampaign) {
          console.log("Fetched raised amount:", data.updatedCampaign.raisedAmount);
          setRaisedAmount(data.updatedCampaign.raisedAmount); // Correct way to update state
        } else {
          console.error("Failed to fetch raised amount");
        }
      } catch (error) {
        console.error("Error fetching raised amount:", error);
      }
    };
  
    fetchRaisedAmount();
  }, [activeCampaignId]);
  
  
  if (!fundraiser) {
    return <p>No fundraiser selected.</p>;
  }

  const progress = (raisedAmount / fundraiser.targetAmount) * 100; // Calculate progress

  const handleDonateClick = () => {
    navigate('/donationpage/payment', { state: { fundraiser } }); // Pass fundraiser data to the PaymentPage
  };
  const handleShareClick = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
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
          <p className="donation-amount">${raisedAmount} USD raised</p>
          <p className="donation-goal">${fundraiser.targetAmount} goal</p>
          
          {/* Progress Bar */}
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>

          {/* Action Buttons */}
          <div className="donation-actions">
            <button className="donate-button"onClick={handleDonateClick}>Donate Now</button>
            {/* <button className="share-button">Share</button> */}
            <button className="share-button" onClick={handleShareClick}>Share</button>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DonationPage;

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./donationpage.css"; 
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const DonationPage = () => {
//   const [raisedAmount, setRaisedAmount] = useState(0);
//   const location = useLocation();
//   const { fundraiser, campaignId } = location.state || {};  // Destructure campaignId from state
//   const navigate = useNavigate();

//   // Ensure we have a campaignId
//   const activeCampaignId = campaignId || fundraiser?._id;  // Use the campaignId from state, or fallback to fundraiser._id
//   console.log("Campaign ID:", activeCampaignId);

//   useEffect(() => {
//     const fetchRaisedAmount = async () => {
//       try {
//         if (!activeCampaignId) return;
        
//         const response = await fetch(`http://localhost:5000/api/get-raised-amount/${activeCampaignId}`);

//         if (!response.ok) {
//           throw new Error("Failed to fetch raised amount");
//         }

//         const data = await response.json();
//         if (data.success) {
//           console.log("Fetched raised amount:", data.raisedAmount);
//           setRaisedAmount(data.raisedAmount);
//         }
//       } catch (error) {
//         console.error("Error fetching raised amount:", error);
//       }
//     };

//     fetchRaisedAmount();
//   }, [activeCampaignId]);

//   if (!fundraiser) {
//     return <p>No fundraiser selected.</p>;
//   }

//   const progress = (raisedAmount / fundraiser.targetAmount) * 100; 

//   const handleDonateClick = () => {
//     navigate('/donationpage/payment', { state: { fundraiser } }); 
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="donation-container">
//         <div className="donation-left">
//           <h1 className="donation-title">{fundraiser.title}</h1>
//           <img src={`http://localhost:5000/${fundraiser.image}`} alt={fundraiser.title} className="donation-image" />
//           <p className="donation-description">{fundraiser.description}</p>
//         </div>

//         <div className="donation-right">
//           <p className="donation-amount">${raisedAmount} USD raised</p>
//           <p className="donation-goal">${fundraiser.targetAmount} goal</p>

//           <div className="progress-bar">
//             <div className="progress" style={{ width: `${progress}%` }}></div>
//           </div>

//           <div className="donation-actions">
//             <button className="donate-button" onClick={handleDonateClick}>Donate Now</button>
//             <button className="share-button">Share</button>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default DonationPage;
