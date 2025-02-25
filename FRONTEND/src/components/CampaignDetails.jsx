import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./campaigndetails.css";

const CampaignDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const campaign = location.state?.campaign;
console.log('campaign',campaign);
console.log("Location state:", location.state);
  if (!campaign) {
    return <p>Loading campaign details...</p>;
  }

  return (
    <div className="campaigns-details">
      <h2>Campaign Details</h2>
      <p><strong>Title:</strong> {campaign.title}</p>
      <p><strong>Description:</strong> {campaign.description}</p>
      <p><strong>Created By:</strong> {campaign.userId}</p>
      <button onClick={() => navigate(-1)} className='back'>Back</button>
    </div>
  );
};

export default CampaignDetails;
