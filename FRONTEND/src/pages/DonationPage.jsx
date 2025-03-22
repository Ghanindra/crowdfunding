// import React from "react";
// import { useLocation ,useParams} from "react-router-dom";
// import  { useState, useEffect } from "react"; // Import useState and useEffect

// import "./donationpage.css"; // Link to CSS
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { useNavigate } from 'react-router-dom';

// const DonationPage = () => {
//   const [raisedAmount, setRaisedAmount] = useState(0);
//   // const { campaignId } = useParams(); // Get campaignId from the URL
//   // console.log("Campaign ID from useParams:", campaignId); // Debugging log
//   const location = useLocation();
//   // const storedCampaignId = localStorage.getItem("campaignId"); // Fallback from storage
//   const { fundraiser,campaignId } = location.state || {}; 
  
//   const activeCampaignId = campaignId || fundraiser?._id;  // Use the campaignId from state, or fallback to fundraiser._id
//   console.log("Campaign ID:", activeCampaignId);
//   const navigate = useNavigate();
//   console.log("Fundraiser Data:", fundraiser);
//   useEffect(() => {
//     const fetchRaisedAmount = async () => {
//       try {
//         if (!activeCampaignId) return;
//         const response = await fetch(`http://localhost:5000/api/update-raised-amount`,{
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ campaignId:activeCampaignId }), // send the campaignId in the request body
//         });
//         const data = await response.json();
//         if (data.success && data.updatedCampaign) {
//           console.log("Fetched raised amount:", data.updatedCampaign.raisedAmount);
//           setRaisedAmount(data.updatedCampaign.raisedAmount); // Correct way to update state
//         } else {
//           console.error("Failed to fetch raised amount");
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

//   const progress = (raisedAmount / fundraiser.targetAmount) * 100; // Calculate progress

//   const handleDonateClick = () => {
//     navigate('/donationpage/payment', { state: { fundraiser } }); // Pass fundraiser data to the PaymentPage
//   };
  
//   // Share in facebook
  
//   const handleShareClick = () => {
//     if (!activeCampaignId) {
//       console.error("Campaign ID is missing");
//       return;
//     }
  
//     // Generate the campaign URL dynamically using the activeCampaignId
//     const campaignUrl = `http://localhost:5000/api/campaign/${activeCampaignId}`;
  
//     // Construct the Facebook share URL
//     const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(campaignUrl)}`;
  
//     // Open the Facebook share dialog
//     window.open(shareUrl, "_blank", "width=600,height=400");
//   };
  
  
//   return (
//     <div>
//       <Navbar />
//       <div className="donation-container">
//         {/* Left Section */}
//         <div className="donation-left">
//           <h1 className="donation-title">{fundraiser.title}</h1>
//           <img
//             src={`http://localhost:5000/${fundraiser.image}`}
//             alt={fundraiser.title}
//             className="donation-image"
//           />
//           <p className="donation-description">{fundraiser.description}</p>
//           <hr/> <hr/>
//           <div className="information">
//     <p className='info'>Support for Vishnu Chaitanya Kosaraju’s Family: Helping to send him Home & Provide Support for His Loved Ones

// It is with deep sadness that we share the untimely passing of our beloved friend, Vishnu with massive heart stroke.<br/><br/> He leaves behind his loving wife, Sowjanya, and their precious baby girl, Saanvi. This tragedy has left their world turned upside down, and we are coming together to help them through this incredibly difficult time.

// Vishnu was a devoted husband, father, and friend, always there for those who needed him. His passing has not only created an emotional void but has also placed a significant financial burden on his family.

// <br/><br/>In addition to covering these transportation costs, we want to ensure that his wife and daughter receive the support they need to cope with this devastating loss and move forward.

// We kindly ask for your support during this challenging time.<br/><br/> Your donations will go directly toward providing financial assistance for Sowjanya and their baby girl as they navigate life without him. Every contribution, no matter how small, will make a meaningful difference to this family as they try to heal.

// If you cannot contribute financially, please consider sharing this campaign with others. We are deeply grateful for your support, prayers, and kindness during this heartbreaking time. Thank you for being part of Vishnu Chaitanya Kosaraju’s legacy and showing his family they are not alone.</p>
// </div>
//         </div>

//         {/* Right Section */}
//         <div className="donation-right">
//           <p className="donation-amount">${raisedAmount} USD raised</p>
//           <p className="donation-goal">${fundraiser.targetAmount} goal</p>
          
//           {/* Progress Bar */}
//           <div className="progress-bar">
//             <div className="progress" style={{ width: `${progress}%` }}></div>
//           </div>

//           {/* Action Buttons */}
//           <div className="donation-actions">
//             <button className="donate-button"onClick={handleDonateClick}>Donate Now</button>
//             {/* <button className="share-button">Share</button> */}
//             <button className="share-button" onClick={handleShareClick}>Share</button>

//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default DonationPage;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./donationpage.css";

const DonationPage = () => {
  const [raisedAmount, setRaisedAmount] = useState(0);
  const [showReportModal, setShowReportModal] = useState(false); // State to show/hide report form
  const [reportReason, setReportReason] = useState(""); // State to store report text
  const location = useLocation();
  const { fundraiser, campaignId } = location.state || {};
  const activeCampaignId = campaignId || fundraiser?._id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRaisedAmount = async () => {
      try {
        if (!activeCampaignId) return;
        const response = await fetch(`http://localhost:5000/api/update-raised-amount`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ campaignId: activeCampaignId }),
        });
        const data = await response.json();
        if (data.success && data.updatedCampaign) {
          setRaisedAmount(data.updatedCampaign.raisedAmount);
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

  const progress = (raisedAmount / fundraiser.targetAmount) * 100;

  const handleDonateClick = () => {
    navigate('/donationpage/payment', { state: { fundraiser } });
  };

  const handleShareClick = () => {
    if (!activeCampaignId) {
      console.error("Campaign ID is missing");
      return;
    }
    const campaignUrl = `http://localhost:5000/api/campaign/${activeCampaignId}`;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(campaignUrl)}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const handleReportClick = () => {
    setShowReportModal(true);
  };

  const handleCloseReport = () => {
    setShowReportModal(false);
    setReportReason("");
  };

  const handleSubmitReport = async () => {
    if (!reportReason) {
      alert("Please enter a reason for the report.");
      return;
    }
    const token = localStorage.getItem("auth-token");
    
  if (!token) {
    alert("You must be logged in to report a campaign.");
    return;
  }
    try {
      const response = await fetch(`http://localhost:5000/api/report-campaign/${activeCampaignId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" ,
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ campaignId: activeCampaignId, reason: reportReason }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Report submitted successfully.");
        handleCloseReport();
      } else {
        alert("Failed to submit report.");
      }
    
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="donation-container">
        <div className="donation-left">
          <h1 className="donation-title">{fundraiser.title}</h1>
          <img src={`http://localhost:5000/${fundraiser.image}`} alt={fundraiser.title} className="donation-image" />
          <p className="donation-description">{fundraiser.description}</p>
        </div>

        <div className="donation-right">
          <p className="donation-amount">${raisedAmount} USD raised</p>
          <p className="donation-goal">${fundraiser.targetAmount} goal</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>

          <div className="donation-actions">
            <button className="donate-button" onClick={handleDonateClick}>Donate Now</button>
            <button className="share-button" onClick={handleShareClick}>Share</button>
            <button className="report-button" onClick={handleReportClick}>Report</button>
          </div>
        </div>
      </div>

      {showReportModal && (
        <div className="report-modal">
          <div className="report-content">
            <h2>Report Campaign</h2>
            <textarea
              placeholder="Enter your reason for reporting..."
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
            />
            <div className="report-buttons">
              <button onClick={handleSubmitReport} className="submit-report">Submit Report</button>
              <button onClick={handleCloseReport} className="close-report">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default DonationPage;
