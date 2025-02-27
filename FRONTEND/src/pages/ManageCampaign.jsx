import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./managecampaign.css";

const ManageCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/campaigns");
        console.log("Fetched Campaigns:", res.data); // Debugging log
        if (res.data && Array.isArray(res.data.data)) {
          setCampaigns(res.data.data);
        } else {
          console.error("Invalid data format received:", res.data);
        }
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
  
    fetchCampaigns();
  }, []);
  
  // Delete a campaign
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      try {
        await axios.delete(`http://localhost:5000/api/campaigns/${id}`);
        setCampaigns((prevCampaigns) => prevCampaigns.filter((campaign) => campaign._id !== id));
      } catch (error) {
        console.error("Error deleting campaign:", error);
      }
    }
  };

  return (
    <div className="manage-campaigns">
      <h2>Manage Campaigns</h2>

      {campaigns.length === 0 ? (
        <p>No campaigns available.</p>
      ) : (
        <div className="campaign-list">
          {campaigns.map((campaign) => (
            <div key={campaign._id} className="campaign-card">
                <img src={`http://localhost:5000/${campaign.image}`} alt={campaign.title} className="campaign-image" />
              <h3>{campaign.title}</h3>
              <p>{campaign.description}</p>
              <button className="view-btn" onClick={() => navigate(`/campaigns/${campaign._id}`, { state: { campaign } })}>
                View Details
              </button>
              <button className="delete-btn" onClick={() => handleDelete(campaign._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageCampaign;
