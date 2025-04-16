import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify"; // ✅ Import toast
import "./donationpage.css";

const DonationPage = () => {
  const [raisedAmount, setRaisedAmount] = useState(0);
  const [milestones, setMilestones] = useState([]);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const location = useLocation();
  const { fundraiser, campaignId } = location.state || {};
  const activeCampaignId = campaignId || fundraiser?._id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        if (!activeCampaignId) return;

        const amountResponse = await fetch(`http://localhost:5000/api/update-raised-amount`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ campaignId: activeCampaignId }),
        });
        const amountData = await amountResponse.json();
        if (amountData.success && amountData.updatedCampaign) {
          setRaisedAmount(amountData.updatedCampaign.raisedAmount);
        } else {
          console.error("Failed to fetch raised amount");
        }

        const milestoneResponse = await fetch(`http://localhost:5000/api/milestones/${activeCampaignId}`);
        const milestoneData = await milestoneResponse.json();
        if (milestoneData.success) {
          setMilestones(milestoneData.milestones);
        } else {
          console.error("Failed to fetch milestones");
        }
      } catch (error) {
        console.error("Error fetching campaign details:", error);
      }
    };

    fetchCampaignDetails();
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
      toast.warn("Please enter a reason for the report.");
      return;
    }

    const token = localStorage.getItem("auth-token");
    if (!token) {
      toast.error("You must be logged in to report a campaign.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/report-campaign/${activeCampaignId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ campaignId: activeCampaignId, reason: reportReason }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Report submitted successfully.");
        handleCloseReport();
      } else {
        toast.error("Failed to submit report.");
      }
    } catch (error) {
      toast.error("Something went wrong while submitting the report.");
      console.error("Error submitting report:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="donation-container">
        {/* Campaign Details */}
        <div className="donation-left">
          <h1 className="donation-title">{fundraiser.title}</h1>
          <img src={`http://localhost:5000/${fundraiser.image}`} alt={fundraiser.title} className="donation-image" />
          <p className="donation-description">{fundraiser.description}</p>
        </div>

        {/* Right Panel */}
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

      {/* Milestones */}
      <div className="milestone-section">
        <h2>Milestones</h2>
        {milestones.length > 0 ? (
          <ul className="milestone-list">
            {milestones.map((milestone) => (
              <li key={milestone._id} className="milestone-item">
                <img src={`http://localhost:5000/${milestone.imageUrls}`} alt={milestone.title} className="donation-image" />
                <h3>{milestone.title}</h3>
                <p>{milestone.description}</p>
                <p><strong>Goal:</strong> ${milestone.amountSpent} USD</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No milestones available.</p>
        )}
      </div>

      {/* Report Modal */}
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
